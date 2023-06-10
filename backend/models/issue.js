const mongoose= require('mongoose');

const issueSchema=new mongoose.Schema({
    issueTitle:{
        type: String,
        required: [true,"Please provide a title"],
    },
    issueDescription:{
        type: String,
        required: [true,"Please provide description"],
    },
    userID:{
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

module.exports=mongoose.model('Issue',issueSchema)