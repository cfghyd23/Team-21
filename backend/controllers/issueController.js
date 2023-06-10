const BigPromise = require('../middlewares/bigPromise');
const Issue = require('../models/issue')

const addNewIssue =BigPromise( async(req, res,next) => {

            const issueTitle = req.body.issueTitle;
            const issueDescription = req.body.issueDescription;
            const createdAt = req.body.createdAt;
            const userID = req.body.userID;

            const newIssue = new Issue({
                issueTitle: issueTitle,
                issuetDescription: issueDescription,
                createdAt: createdAt,
                userID: userID
            })

            // console.log(newIssue);
            newIssue.save();

            // res.redirect("/")
        
    
})

module.exports = addNewIssue