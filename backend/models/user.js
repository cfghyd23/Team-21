const mongoose= require('mongoose');
const validator=require('validator');
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
//crypto is defalut nodejs package
const crypto=require('crypto');
const { log } = require('console');
require('dotenv').config();



const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please provide a name"],
        maxlength:[40,"Name should be under 40 characters"]
    },
    email:{
        type: String,
        required: [true,"Please provide email"],
        validate:[validator.isEmail,"Please enter a valid email"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"Please provide a password"],
        minlength:[6,"Password shouldbe atleast 6 characters"],
        select:false
        //select: false prevents password from coming when user object is called
    },
    // photo:{
    //     id: {
    //         type:String,
    //         required:true
    //     },
    //     secure_url: {
    //         type:String,
    //         required:true
    //     },
    // },
    age:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    typeOfUser:{
        type:String,
        required:true
    },
    employmentStatus:{
        type:String,
        default:undefined
    },
    company:{
        type:String,
        default:undefined
    },
    forgotPasswordToken: String,
        // default:undefined
    
    forgotPasswordExpiry: Date,
        // default:undefined
    createdAt:{
        type: Date,
        default: Date.now
        //why not .now()-->because we want the time when obj is created not of table
    }
});

//encrypt password before save
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10)
});

//validate the password with passed on user password
userSchema.methods.isValidatedPassword=async function (userSendPassword) {
    //returns true or false
    // console.log(this);
    return await bcrypt.compare(userSendPassword,this.password);
}

//method for create and return jwt token
userSchema.methods.getJwtToken=async(user)=> {
    // console.log("bvcbnv "+user);
    return await jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY,
    });
}



//generate forgot password token(string)
userSchema.methods.getForgotPasswordToken= async(user)=> {
    //generate a long and rando string 
    const forgotToken=crypto.randomBytes(20).toString('hex');
    //getting a hash- make sure to get a hash on backend 
    const abc=crypto.createHash("sha256").update(forgotToken).digest('hex');
    user.forgotPasswordToken=abc;
    // console.log(this.forgotPasswordToken);
    user.forgotPasswordExpiry=Date.now()+20*60*1000;
    await user.save({validateBeforeSave:false});
    return forgotToken;
}

module.exports=mongoose.model('User',userSchema)