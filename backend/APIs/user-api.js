const exp = require('express')
const userApp = exp.Router();
const verifyToken= require('./verifyToken')
//used to hash the password
const bcrypt = require('bcryptjs')
//to send the token
const jwt = require('jsonwebtoken')
//to handle the  asynchronous errors in program
const asyncerrorhandler = require('express-async-handler')

let userscollection;

//getting the collection from server
userApp.use((req,res,next)=>{
    userscollection= req.app.get("UserCollection")
    next();
})
userApp.get('/test-user',(req,res)=>{
    res.send({message:"This is from user api"})
})

//user registration route
userApp.post('/user',asyncerrorhandler(async (req,res)=>{
    let newuser = req.body;
    //check for the duplicate password
    const dbob = await userscollection.findOne({username: newuser.username});
    
    if(dbob!=null){
        res.send({message:"UserName is already exist"})
    }
    else{
        //hash the password
        const hashedpassword = await bcrypt.hash(newuser.password,5);
        //replace plain password with hashed password
        newuser.password= hashedpassword;
        //insert the user
        const obj = await userscollection.insertOne(newuser);
        if(obj.acknowledged===true) {
            res.send({message:"Usercreated"})
        } 
    }
}))
//user login route
userApp.post('/login', asyncerrorhandler(async (req,res)=>{
    let dbuser = req.body;
    //checking for username
    const output = await userscollection.findOne({username:dbuser.username})
    if(output===null ) {
        res.send({message:"Invalid Username"})
    }
    else{//
        //comparing the passwords
        const status = await bcrypt.compare(dbuser.password,output.password)
        if(status === false) {
            res.send({message:"Invalid Password"})
        }
        else{//sending the token as response
            let signedtoken = jwt.sign({username:dbuser.username},process.env.SECRET_CODE,{expiresIn:'1d'})
            res.send({message :"User Login Successful",token: signedtoken,user:dbuser})
        }
    }

}))
    //user writing the comments to articles
    userApp.post('/comment/:articleid',verifyToken,asyncerrorhandler(async (req,res)=>{
        const articles = req.app.get("articlescollection");
        let newarticleid = Number(req.params.articleid);
        let obj = req.body;
        const output = await articles.updateOne({articleId:newarticleid},{$addToSet:{comments:obj}})
        if(output.modifiedCount===1){
            res.send({message:"Comment Posted"})
        }
        
    }))

    //user reading articles
    userApp.get('/articles',verifyToken,asyncerrorhandler(async (req,res)=>{
        const articles = req.app.get("articlescollection")
        const articlelist = await articles.find().toArray();
        res.send({message:"articles",payload:articlelist})
    }))

    //adding new authors for the following authors
    userApp.post('/follow',verifyToken,asyncerrorhandler(async (req,res)=>{
        const articles = req.app.get("articlescollection")
        const authorcollection=req.app.get('authorcollection')
        const userobj = req.body;
        const id = Number(userobj.data)
        const usname = await articles.findOne({articleId:id})
        userobj.data = usname.username;
        await userscollection.updateOne({username:userobj.username},{$addToSet:{following:userobj.data}})
        await authorcollection.updateOne({username:userobj.data},{$addToSet:{followers:userobj.username}})
        res.send({message:"Following"})
    }))

    //making genere request
    userApp.post('/articlesbygenere',verifyToken,asyncerrorhandler(async (req,res)=>{
        const articles = req.app.get("articlescollection")
        const obj = req.body;
        // console.log(obj);
       const output =await articles.find({genere:obj.genere}).toArray();
    //    console.log(output);
       res.send({message:"Article by Genere",payload:output})
    }))

    module.exports=userApp
    