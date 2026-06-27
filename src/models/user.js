const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        type: String,
        enum: {
            values :["male","female","other"],
            message : `{value} is not supported`
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
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({userId : user._id},'Keerthana@123',{expiresIn :'7d'});
    return token;
}
userSchema.methods.validatePassword = async function(passwordInputBytheUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputBytheUser,passwordHash);
    return isPasswordValid;
}
 const User = mongoose.model("User",userSchema);
 module.exports=User;

