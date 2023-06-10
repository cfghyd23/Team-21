const mongoose= require('mongoose');

const issueSchema=new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Please provide a title"],
    },
    description:{
        type: String,
        required: [true,"Please provide description"],
    },
    userId:{
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