let exp = require('express');
let app =exp()
require('dotenv').config()
const port = process.env.PORT|| 5000 ;
let userApp = require('./APIs/user-api')
let authorApp = require('./APIs/author-api')
let adminApp = require('./APIs/admin-api')
const path = require('path');

//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../client/blogapp/build')))

app.use(exp.json())//tp parse body of req
const mongodb = require('mongodb').MongoClient;//getting mongodb
mongodb.connect(process.env.DB_URL)
.then(client=>{
    let blogdb= client.db('blogapp')
    let userCollections = blogdb.collection('usercollection')//retreiving usercollection
    let articlescollection = blogdb.collection('articlescollection')//retreiving articlecollection
    let authorcollection = blogdb.collection('authorcollection')//retreiving authorcollection
    
    app.set('UserCollection',userCollections);
    app.set('articlescollection',articlescollection)
    app.set('authorcollection',authorcollection)
})
.catch(err=>{console.log("Error in connecting to db",err);})

//importing apis from apis
//if path starts with user-api send request to user app
app.use('/user-api',userApp);
//if path starts with author-api send request to user app
app.use('/author-api',authorApp);
//if path starts with admin-api send request to user app
app.use('/admin-api',adminApp);

//for refreshing purpose
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/blogapp/build/index.html'))
})

//catching the errors and printing to screen
app.use((err,req,res,next)=>{
    res.send({errMessage:err.message})
})

app.listen(port,()=>{console.log("Server Started on port",port);})