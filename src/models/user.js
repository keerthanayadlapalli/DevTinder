const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new  mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id:" + value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password:" + value);
            }
        }
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("invalid gender value:" + value);

            }
        }
    },
    about:{
        type:String,
        default:"This is the default description of the user",
    },
    skills:{
        type:[String],
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo url:" + value);
            }
        }
    },
},{
    timestamps:true
  }
);
 const User = mongoose.model("User",userSchema);
 module.exports=User;

