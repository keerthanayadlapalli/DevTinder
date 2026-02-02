const express = require('express');
const app =express();
app.use("/getUserData",(req,res)=>{
    try{
        //logic to DB call and get user data
        throw new Error("DB connection failed");
        res.send("User Data sent successfully");
        
    }
    catch(err){
        res.status(500).send("something went wrong");
    }
})

app.listen(7777,()=>{
    console.log('Server is running on port 7777');
}); 