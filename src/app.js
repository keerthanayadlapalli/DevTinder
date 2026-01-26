const express = require('express');
const app =express();
app.use("/user/:userId/:name/:password",(req,res)=>{
     console.log(req.params);
     res.send('this is keerthana yadlapalli');
});
app.listen(7777,()=>{
    console.log('Server is running on port 7777');
});