const BigPromise = require('../middlewares/bigPromise');
const Announcement = require('../models/announcement')

exports.addNewAnnouncement =BigPromise (async(req, res,next) => {
   
            const announcementTitle = req.body.announcementTitle;
            const announcementDescription = req.body.announcementDescription;
            const user = req.user.id;

            const newAnnouncement = new Announcement({
                announcementTitle: announcementTitle,
                announcementDescription: announcementDescription,
                user: user
            })

            await newAnnouncement.save();
            res.status(200).json({
                success:true,
                newAnnouncement
            })

})

exports.showAnnouncement = BigPromise( async(req, res,next) => {
    
    Announcement.find({}).then(function(foundItems){
        console.log(foundItems);

        res.status(200).json({
            success:true,
            foundItems
        })

    })

})
