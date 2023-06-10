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
            await newIssue.save();

            res.status(200).json({
                success:true,
                newIssue
            })
    
})

exports.showIssue = BigPromise( async(req, res,next) => {
    
    Issue.find({}).then(function(foundItems){
        console.log(foundItems);

        res.status(200).json({
            success:true,
            foundItems
        })

    })

});


exports.showIssuebyId = BigPromise( async(req, res,next) => {
    
    // const issues=Issue.find({user:id})
    // req.iss=issues
    // next();
    Issue.find({user:req.user.id}).then(function(foundItems){
        console.log(foundItems);

        res.status(200).json({
            success:true,
            foundItems
        })

    })

});
