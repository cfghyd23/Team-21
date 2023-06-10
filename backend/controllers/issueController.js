const BigPromise = require('../middlewares/bigPromise');
const Issue = require('../models/issue')

exports.addNewIssue =BigPromise( async(req, res,next) => {

            const issueTitle = req.body.issueTitle;
            const issueDescription = req.body.issueDescription;
            const user = req.user.id;
            const category=req.body.category;

            const newIssue = new Issue({
                issueTitle: issueTitle,
                issueDescription: issueDescription,
                user: user,
                category:category
            })

            // console.log(newIssue);
            newIssue.save();
            res.status(200).json({
                success:true,
                newIssue
            })


            // res.redirect("/")
        
    
})
