const express = require('express');
const connectDB = require('./config/database');
const app =express();
const User = require('./models/user');
app.use(express.json());
app.post('/signup',async(req,res)=>{
 const user = new User(req.body);
 try{
    await user.save();
    res.send("User created successfully");
 }
 catch(err){
    res.status(400).send("Error creating user");
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
})



