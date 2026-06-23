const express = require('express');
const connectDB = require('./config/database');
const app =express();
const User = require('./models/user');
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');
const authRouter = require('./Routes/Auth');
const profileRouter = require('./Routes/Profile');
const requestRouter = require('./Routes/requests');
app.use(cookieParser());
app.use(express.json());
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);

connectDB().then(()=>{
    console.log("DB connected successfully");
    app.listen(7777,()=>{
    console.log('Server is running on port 7777');
}); 
})
.catch((err) => {
    console.log("DB connection failed");
    console.log(err);
});






