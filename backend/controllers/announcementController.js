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

            // console.log(newAnnouncement);
            await newAnnouncement.save();
            res.status(200).json({
                success:true,
                newAnnouncement
            })

            // res.redirect("/")
        
    
})
