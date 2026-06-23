const express = require('express');
const authRouter = express.Router();
const {validateSignupData} = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');
//Sign up for a user
authRouter.post('/signup',async(req,res)=>{
    try{
        //Validate the data
        validateSignupData(req);
        const {firstName,lastName,emailId,password} = req.body;
        //Encrypt the password
        const passwordHash =  await bcrypt.hash(password,10);
        const user = new User({
            firstName,lastName,emailId,password:passwordHash
        });
        await user.save();
        res.send("User created successfully");
    }
    catch(err){
        res.status(400).send(err.message);
    }
});
//Login of a User
authRouter.post('/login',async(req,res)=>{
    try{
         const{emailId,password} = req.body;
         const user = await User.findOne({emailId:emailId});
         if(!user){
            throw new Error("Invalid credentials");
         }
         const isPasswordValid = await user.validatePassword(password);
         if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("Token",token,{expires : new Date(Date.now()+ 8 *3600000)});
            res.send("Login successful");
         }
         else{
            throw new Error("Invalid credentials");
         }
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});
module.exports = authRouter;