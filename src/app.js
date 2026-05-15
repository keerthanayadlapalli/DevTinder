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
.catch((err=>{
    console.log("DB connection failed");
}));



