const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req,res,next){ //next- to pass control to next middleware function in req processing pipeline
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access Denied. No tokken provided. ");

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECERT);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send("Invalid") //400 for bad request
    }
    
}
module.exports = auth;


