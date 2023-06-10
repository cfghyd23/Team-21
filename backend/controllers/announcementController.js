const Announcement = require('../models/announcement')

const addNewAnnouncement = async(req, res) => {
    try{
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
        
    } catch(error) {
        console.log(error);
    }
}

module.exports = addNewAnnouncement