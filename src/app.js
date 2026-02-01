const express = require('express');
const app =express();
app.use("/user",(req,res,next)=>{
    console.log("1st print statement");
      next();
    res.send("1st response");
      
    },(req,res)=>{
    console.log("2nd print statement");
    res.send("2nd response");
    });

app.listen(7777,()=>{
    console.log('Server is running on port 7777');
}); 