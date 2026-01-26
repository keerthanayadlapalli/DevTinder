const express = require('express');
const app =express();
app.use("/home",(req,res)=>{
     res.send('this is home page');
});
app.delete("/user",(req,res)=>{
     res.send("Data got deleted from the database");
});
app.listen(7777,()=>{
    console.log('Server is running on port 7777');
});