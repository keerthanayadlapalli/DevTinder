const express = require('express');
const connectDB = require('./config/database');
const app =express();
const User = require('./models/user');
app.post('/signup',async(req,res)=>{
    const user = new User({
        firstName:"Keerthana",
        lastName:"Yadlapalli",
        emailId:"keerthanayadlapalli896@gmail.com",
        password:"keerthana123",
        age:21,
        gender:"Female"
    })
    await user.save();
    res.send("User created successfully");
})
connectDB().then(()=>{
    console.log("DB connected successfully");
    app.listen(7777,()=>{
    console.log('Server is running on port 7777');
}); 
})
.catch((err=>{
    console.log("DB connection failed");
}));



