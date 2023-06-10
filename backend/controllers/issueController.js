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

exports.showPersonalIssue = BigPromise( async(req, res,next) => {
    // console.log(req.params.id);
    // console.log("hello");
    const announcementId = req.params.id;

    Issue.findById(announcementId).then(function(foundItems){
        // console.log(foundItems);

        res.status(200).json({
            success:true,
            foundItems
        })
    })
});


exports.modifyIssue = BigPromise( async(req, res,next) => {
    // console.log(req.body.issueId);
    // console.log(req.body.status);
    // console.log("hello");
    const issueId = req.body.issueId;


    Issue.findByIdAndUpdate(issueId,{status:req.body.status}).then(function(foundItems){
        // console.log(foundItems);
        // foundItems.status=req.body.status;
        foundItems.save({validateBeforeSave:false})
        res.status(200).json({
            success:true,
            foundItems
        })
    })
});