const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

// Get all the pending connection requests received by the logged-in user
userRouter.get('/user/received/pending/requests', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",["firstName","lastName","age","skills"]);

        res.json({
            message: "Pending requests fetched successfully",
            data: connectionRequests
        });

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
//Get all the connections of a user
userRouter.get('/user/connections',userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId : loggedInUser , status : "accepted"},
                {fromUserId : loggedInUser , status : "accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName"])
          .populate("toUserId",["firstName","lastName"]);

          const data = connectionRequests.map ((row)=>{
            if(row.fromUserId._id .toString()=== loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
          })
          res.json({data});
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

    
 

module.exports = userRouter;