const User=require("../models/user");
const BigPromise=require('../middlewares/bigPromise');
const CustomError=require('../utils/customError');
const jwt=require("jsonwebtoken");
require('dotenv').config();

exports.isLoggedIn=BigPromise(async(req,res,next)=>{
    const token=req.cookies.token||req.header("Authorization").replace("Bearer ","");

    if(!token){
        return next(new CustomError("Login first to access this page",401));
    }
    // console.log(token);
    // jwt.sign({id:this._id},process.env.JWT_SECRET,{
    //     expiresIn:process.env.JWT_EXPIRY,
    // });
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    // if(decoded){
        console.log(decoded);
        req.user=await User.findById(decoded.id)
        console.log(req.user);
    next();
    // }
})


exports.customRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new CustomError("you aren't allowed for this resource",403))
        }
        next()
    };
    
};