const exp = require('express')
const authorApp = exp.Router();
//importing the verifytoken
const verifyToken = require('./verifyToken')
//used to hash the passwords
const bcrypt = require('bcryptjs')
//used to handle the asynchronous errors in the program
const asyncerrorhandler= require('express-async-handler')
//used to send the token 
const jwt = require('jsonwebtoken')
let authorcollection;
//getting the author collection
authorApp.use((req,res,next)=>{
    authorcollection=req.app.get('authorcollection')
    next()
})
//author registration
authorApp.post('/author',asyncerrorhandler(async (req,res)=>{
    let newauthor = req.body;
    const dbauthor = await authorcollection.findOne({username:newauthor.username})
    if(dbauthor!=null){
        res.send({message:"Author Name already exist"})
    } 
    else{
        //hash the password
        const hashedpassword = await bcrypt.hash(newauthor.password,5);
        //replace plain password with hashed password
        newauthor.password = hashedpassword;
        //insert the author
        const output = await authorcollection.insertOne(newauthor);
        if(output.acknowledged===true){
            res.send({message:"Authorregistered"})
        }
    }
}))
//author login
authorApp.post('/login',asyncerrorhandler(async (req,res)=>{
    let author = req.body;
    //verifying user name
    const dbauthor = await authorcollection.findOne({username:author.username});
    if(dbauthor===null){
        res.send({message:"Invalid Username"})
    }
    else{
        //verifying the passwords
        const status = await bcrypt.compare(author.password,dbauthor.password)
        if(status === false){
            res.send({message:"Invalid password"})
        }
        else{//sending the token
            let signedtoken = jwt.sign({username:author.username},process.env.SECRET_CODE,{expiresIn:'1d'});
            res.send({message:"Login Successful",token:signedtoken,user:author})
        }

    }
}))
//posting the article by author
authorApp.post('/article',verifyToken,asyncerrorhandler(async (req,res)=>{
    let newarticle = req.body;
    const articlecollection = req.app.get('articlescollection')
   const dbobj=  await articlecollection.insertOne(newarticle)
   if(dbobj.acknowledged===true) {
    res.send({message:"Article Added"})
   }

}))
//editing the article by aurthor
authorApp.put('/article',verifyToken,asyncerrorhandler(async (req,res)=>{
    let articlescollection = req.app.get('articlescollection');
    const obj = req.body;
    const output = await articlescollection.updateOne({articleid:obj.articleid},{$set:{...obj}})
    let newarticle = await articlescollection.findOne({articleid:obj.articleid})
    if(output.acknowledged===true) {
        res.send({message:"Article modified",article:newarticle})
    }

})) 
//soft deleting the article
authorApp.put('/article/:articleid',verifyToken,asyncerrorhandler(async (req,res)=>{
    let articlescollection = req.app.get('articlescollection');
    let articleidfromurl = req.params.articleid;
    let articlebody = req.body;
    const output = await articlescollection.updateOne({articleid:articleidfromurl},{$set:{...articlebody,status:false}})
    if(output.acknowledged===true){
        res.send({message:"Article deleted"})
    }
}))
//author viewing his articles
authorApp.get('/articles/:authorname',asyncerrorhandler(async (req,res)=>{
    let authornamefromurl = req.params.authorname;
    let articlescollection = req.app.get('articlescollection')
    const articlesList = await articlescollection.find({username:authornamefromurl},{status:true}).toArray();
    res.send({message:"Author Artices",payload:articlesList})   
}))

authorApp.get('/:authorname',verifyToken,asyncerrorhandler(async (req,res)=>{
    const obj = req.params.authorname;
    // console.log(obj);
     const len = await authorcollection.findOne({username:obj})
     console.log(len);
    res.send({message:"followers ",payload: len.followers.length})
}))

module.exports=authorApp