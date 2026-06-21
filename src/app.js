const express = require('express');
const connectDB = require('./config/database');
const app =express();
const User = require('./models/user');
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser());
app.use(express.json());

//Signup a user
app.post('/signup',async(req,res)=>{
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
//Get Profile of a user
app.get('/profile',async(req,res)=>{
    try{
        const cookies = req.cookies;
        const {Token} = cookies;
        if(!Token){
            throw new Error("Invalid token");
        }
        const decodedmessage = jwt.verify(Token,'Keerthana@123');  
        const {userId} = decodedmessage;
        console.log("logged user is :"+ userId);
        const user = await User.findById(userId);
        if(!user){
            throw new Error("User not found");
        }
        res.send(user);
    }
        catch(err){
            res.status(400).send("ERROR: " + err.message);
        }
    

})
//Login a user
app.post('/login',async(req,res)=>{
    try{
         const{emailId,password} = req.body;
         const user = await User.findOne({emailId:emailId});
         if(!user){
            throw new Error("Invalid credentials");
         }
         const isPasswordValid = await bcrypt.compare(password,user.password);
         if(isPasswordValid){
            const token = jwt.sign({userId:user._id},'Keerthana@123');
            res.cookie("Token",token);
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
connectDB().then(()=>{
    console.log("DB connected successfully");
    app.listen(7777,()=>{
    console.log('Server is running on port 7777');
}); 
})
.catch((err) => {
    console.log("DB connection failed");
    console.log(err);
});
//get user by email id
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    console.log(userEmail);
    try{
         const user = await User.find({emailId : userEmail});
         res.send(user);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }

});
//getting all the users
app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users); 
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});
//Delete user by id 
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        // const user = await User.findByIdAndDelete({_id : userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});
// Update data of the user
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = [
        "age","gender","about", "skills","photoUrl"
    ];
    isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    if(data?.skills.length >10){
        throw new Error("skills cannot be more than 10");
    }
        const user = await User.findByIdAndUpdate({_id : userId},data,
            {returnDocument:"after",
             runValidators:true}
        );

        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send(err.message);
    }
});
//""




