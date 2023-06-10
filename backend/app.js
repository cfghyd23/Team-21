const express=require('express');
require('dotenv').config();
const app=express();
const morgan=require("morgan");
const cookieParser=require("cookie-parser");


//regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookies and file middleware
app.use(cookieParser());

//temp check
// app.set("view engine", "ejs")


//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const user=require('./routes/user')

//router middleware
app.use('/api/v1',user)



//export app.js
module.exports=app