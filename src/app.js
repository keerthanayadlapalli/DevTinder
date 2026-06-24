const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

const app =express();

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






