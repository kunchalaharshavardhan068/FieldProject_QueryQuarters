let exp= require('express')
let adminApp = exp.Router()
adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"This is from admin api"})
})

module.exports=adminApp