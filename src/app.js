const express = require('express');
const app =express();
const {adminAuth,userAuth}=require('../middlewares/auth.js');
app.use("/admin",adminAuth);
app.delete("/admin/deleteAdmin",(req,res)=>{
    res.send("Admin Deleted Successfully");
});
app.get("/admin/getAllData",(req,res)=>{
    res.send("Hello from DevTinder Admin Panel");;
});
app.use("/user/data",userAuth,(req,res)=>{
    res.send("user data sent successfully");
});
app.use("/user/login",(req,res)=>{
    res.send("user logged in Successfully");
});

app.listen(7777,()=>{
    console.log('Server is running on port 7777');
}); 