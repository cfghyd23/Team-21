const Razorpay = require("razorpay");
const BigPromise=require("../middlewares/bigPromise");



exports.sendRazorpayKey=BigPromise(async(req,res,next)=>{
    res.status(200).json({
        razorpaykey:process.env.RAZORPAY_API_KEY,
    })
});

exports.captureRazorpayPayment=BigPromise(async(req,res,next)=>{
    var instance=new Razorpay({
        key_id:proces.env.RAZORPAY_API_KEY,
        key_secret:proces.env.RAZORPAY_SECRET
    })
    var options={
        amount:req.body.amount,
        currency:"INR",
    }
    var myOrder=instance.orders.create(options);
    res.status(200).json({
        success:true,
        amount:req.body.amount,
        order:myOrder
    })
});