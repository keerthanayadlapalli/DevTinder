const mongoose = require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://keerthana:honey2026@honeynode.rtsepgu.mongodb.net/DevTinder?appName=HoneyNode");

}
module.exports=connectDB;
