const express = require('express');
const requestRouter = express.Router();
const{userAuth} = require('../middlewares/auth');
//sending connection request
requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    const user = req.user;
    console.log("request sent");
    res.send(user.firstName + " sent the request successfully");
})
module.exports = requestRouter;