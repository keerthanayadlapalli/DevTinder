const jwt = require('jsonwebtoken');
const User = require('../src/models/user');
const userAuth= async (req,res,next)=>{
    try{
    const {Token} = req.cookies;
    if(!Token){
        throw new Error("Invalid Token");
    }
    const decodedData = jwt.verify(Token,'Keerthana@123');
    const {userId} = decodedData;
    const user = await User.findById(userId);
    if(!user){
        throw new Error("User not found");
    }
    req.user = user;
    next();
    }

    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}
module.exports={userAuth};