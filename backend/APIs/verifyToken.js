const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    let bearertoken = req.headers.authorization;
    if(!bearertoken)
    {
        res.send({message:"Unauthorized Access Please login to continue"})
    }
    const token = bearertoken.split(' ')[1];
    try{
        jwt.verify(token,process.env.SECRET_CODE);
        next();
    }
    catch(err){
        res.send({message:"Unauthorized Request please login to continue"})
        next();
    }

}
module.exports = verifyToken; 