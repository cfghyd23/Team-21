const BigPromise = require('../middlewares/bigPromise');
const Announcement = require('../models/announcement')

const addNewAnnouncement =BigPromise (async(req, res,next) => {
   
            const announcementTitle = req.body.announcementTitle;
            const announcementDescription = req.body.announcementDescription;
            const createdAt = req.body.createdAt;
            const userID = req.body.userID;

            const newAnnouncement = new Announcement({
                announcementTitle: announcementTitle,
                announcementDescription: announcementDescription,
                createdAt: createdAt,
                userID: userID
            })

            // console.log(newAnnouncement);
            newAnnouncement.save();

            // res.redirect("/")
        
    
})

module.exports = addNewAnnouncement