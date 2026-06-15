const validator = require('validator');
const validateSignupData = (req)=>{
    const{firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("firstName and lastName are required");
    }
    else if(firstName.length < 4|| lastName.length >50){
        throw new Error("firstName and lastName should be between 4 to 50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid emailId");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password should be strong");
    }

}
module.exports = {
    validateSignupData
};