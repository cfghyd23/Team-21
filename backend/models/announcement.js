const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    announcementTitle: {
        type: String,
        required: [true,"Please provide an issue title"],
        maxlength:[40,"Name should be under 40 characters"]
    },
    announcementDescription: {
        type: String,
        required: [true,"Please provide a suitable description"],
        maxlength:[100,"Name should be under 100 characters"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
