const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const CustomError=require('../utils/customError')
const mailHelper=require('../utils/emailHelper')
const cookieToken = require('../utils/cookieToken')
// const fileUpload=require("express-fileupload")
const cloudinary=require("cloudinary")
const crypto=require("crypto")

exports.signup=BigPromise(async(req,res,next)=>{

    // let result;
    // if(!req.files){
    //     return next(new CustomError("photo is required for sample",400));
    // }
    
    const {name,
        email,
        password,
        age,
        phoneNumber,
        location,
        typeOfUser,
        employmentStatus,
        company}=req.body

    if(!email||!name||!password){
        return next(new CustomError('Name, email and password are required',400))
    }

    // let file=req.files.photo
    // const result=await cloudinary.v2.uploader.upload(file.tempFilePath,{
    //     folder:"users",
    //     width:150,
    //     crop:"scale"
    // })
    
    //making an entry in database
    const user =await User.create({
        name,
        email,
        password,
        age,
        phoneNumber,
        location,
        typeOfUser,
        employmentStatus,
        company
    })

    cookieToken(user,res);

})

exports.login=BigPromise(async (req,res,next)=>{
    const {email,password}=req.body

    //check for email and password
    if(!email||!password){
        return next(new CustomError("please provide email and password",400))
    }

    //why select +password because while creating schema we by default made it false
    //getting user from DB
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new CustomError("Email or password does not match or does not exist",400))
    }
    //matching the paswword
    const isPasswordCorrect= await user.isValidatedPassword(password);

    if(!isPasswordCorrect){
        return next(new CustomError("Email or password does not match or does not exist",400))
    }

    //if all goes good we send the token
    cookieToken(user, res);


})

exports.logout=BigPromise(async (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        messgae:"Logout Success"
    });
});


exports.forgotPassword=BigPromise(async (req,res,next)=>{
    const {email}=req.body;
    console.log(email)
    const user=await User.findOne({email});
    if(!user){
        return next(new CustomError("Email not found",400))
    }

    const forgotToken=await user.getForgotPasswordToken(user);

    // await user.save({validateBeforeSave:false});

    console.log(forgotToken);

    const myUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${forgotToken}`

    const message=`Copy paste this link in your url and hit enter\n\n${myUrl}`

    try {
        await mailHelper({
            email:user.email,
            subject:"Password reset email",
            message
        });
        res.status(200).json({
            success:true,
            message:"eMail sent successfully"
        })
    } catch (error) {
        user.forgotPasswordToken=undefined
        user.forgotPasswordExpiry=undefined
        await user.save({validateBeforeSave:false});
        return next(new CustomError(error.message,500))
    }

});

exports.passwordReset=BigPromise(async (req,res,next)=>{
    const token=req.params.token
    if(!token){
        return next(new CustomError("No Token"),400)
    }
    // console.log(token);
    const encryToken=crypto.createHash("sha256").update(token).digest('hex');
    console.log(encryToken);
    const user=await User.findOne({
        forgotPasswordToken:encryToken,
        forgotPasswordExpiry:{$gt:Date.now()}
    });
    if(!user){
        return next(new CustomError("Either token is invalid or expired"),400)
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new CustomError("Password and Confirm Password do not match"),400)    
    }

    user.password=req.body.password;
    user.forgotPasswordExpiry=undefined;
    user.forgotPasswordToken=undefined;
    await user.save()
    // send a json response or send token
    cookieToken(user,res);
});

exports.getLoggedInUserDetails=BigPromise(async (req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    });
});

exports.changePassword=BigPromise(async (req,res,next)=>{
    const userId=req.user.id
    const user= await User.findById(userId).select("+password")
    const isCorrectOldPassword=await user.isValidatedPassword(req.body.oldPassword)

    if(!isCorrectOldPassword){
        return next(new CustomError("Old password is incorrect",400))
    }
    user.password=req.body.password
    await user.save()
    cookieToken(user,res);
});

exports.updateUserDetails=BigPromise(async (req,res,next)=>{
    const newData={
        name:req.body.name,
        email:req.body.email
    }
    if(req.files){
        const user=User.findById(req.user.id)
        const imageId=user.photo.id
        const resp= await cloudinary.v2.uploader.destroy(imageId)
        let file=req.files.photo
        const result=await cloudinary.v2.uploader.upload(file.tempFilePath,{
            folder:"users",
            width:150,
            crop:"scale"
        });
        newData.photo={
            id:result.public_id,
            secure_url:result.secure_url
        }
    }
    const user=await User.findByIdAndUpdate(req.user.id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
    });


});


exports.adminAllUser=BigPromise(async (req,res,next)=>{
    const users=await User.find({})
    res.status(200).json({
        success:true,
        users,
    })
});

exports.ManagerAllUser=BigPromise(async (req,res,next)=>{
    const users=await User.find({role:"user"})
    res.status(200).json({
        success:true,
        users,
    })
});

exports.admingetOneUser=BigPromise(async (req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        next(new CustomError("No user with such ID",400))
    }
    res.status(200).json({
        success:true,
        user
    });
});

exports.adminUpdateOneUserDetails=BigPromise(async (req,res,next)=>{
    const newData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user=await User.findByIdAndUpdate(req.params.id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
    });


});

exports.adminDeleteOneUser=BigPromise(async (req,res,next)=>{
    const user=User.findById(req.params.id)
    if(!user){
        return next(new CustomError("No such user found",401))
    }

    const imageId=user.photo.id
    await cloudinary.v2.uploader.destroy(imageId)

    await user.remove()
    res.status(200).json({
        success:true,
    })
});

// exports.mailAll=BigPromise(async (req,res,next)=>{
//     let userr=await User.find({}).then(function(foundItems){
//         // console.log(foundItems);
//         foundItems.forEach(item){
//             try {
//                 await mailHelper({
//                     email:userr.email,
//                     subject:this.issueTitle,
//                     message:this.issueDescription
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//         };
// });
// });

exports.mailAll=BigPromise(async (req,res,next)=>{
    let userr = await User.find()
    let arr=[]
    for (let index = 0; index < userr.length; index++) {
        const element = userr[index];
        if(element.typeOfUser!=='homeController'&&element.typeOfUser!=='cityController'&&element.typeOfUser!=='stateController'){
            arr.push(element)
        }
    }
    for (let index = 0; index < arr.length; index++) {
        try {
                            await mailHelper({
                                email:arr[index].email,
                                subject:"Feedback Form - We care for you",
                                message:"https://docs.google.com/forms/d/e/1FAIpQLSdFC583L0Dplh0V4OCzHF0N9-COglo8S7A9Kxf6jT4PX0Pqeg/viewform?usp=sf_link"
                            });
                        } catch (error) {
                            console.log(error);
                        }
    }
})
