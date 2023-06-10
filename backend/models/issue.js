const mongoose= require('mongoose');
const User = require("../models/user");
const CustomError = require('../utils/customError');
const mailHelper=require('../utils/emailHelper')

const issueSchema=new mongoose.Schema({
    issueTitle:{
        type: String,
        required: [true,"Please provide a title"],
    },
    issueDescription:{
        type: String,
        required: [true,"Please provide description"],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "Open"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


issueSchema.pre('save',async function(req,res,next){
    
    // console.log(this.user);
    let userr=await User.findOne({typeOfUser:"homeConroller"})
    try {
        await mailHelper({
            email:userr.email,
            subject:this.issueTitle,
            message:this.issueDescription
        });
    } catch (error) {
        console.log(error);
    }
    userr=await User.findOne({typeOfUser:"cityConroller"})
    try {
        await mailHelper({
            email:userr.email,
            subject:this.issueTitle,
            message:this.issueDescription
        });
    } catch (error) {
        console.log(error);
    }
    userr=await User.findOne({typeOfUser:"StateConroller"})
    try {
        await mailHelper({
            email:userr.email,
            subject:this.issueTitle,
            message:this.issueDescription
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports=mongoose.model('Issue',issueSchema)