const Issue = require('../models/issue')

const addNewIssue = async(req, res) => {
    try{
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
        
    } catch(error) {
        console.log(error);
    }
}

module.exports = addNewIssue