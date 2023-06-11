const express=require("express");
const router=express.Router();

const {signup,login,logout,forgotPassword,passwordReset, getLoggedInUserDetails, mailAll}=require("../controllers/userContoller")

const {isLoggedIn,customRole}=require("../middlewares/user");

const { addNewAnnouncement, showAnnouncement,showPersonalAnnouncement } = require("../controllers/announcementController");
const {addNewIssue, showIssue,showIssuebyId, showPersonalIssue,modifyIssue} = require("../controllers/issueController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
const yA=['youngAdult','alumni']
router.route("/addNewAnnouncement").post(isLoggedIn,addNewAnnouncement);
router.route("/addNewIssue").post(isLoggedIn,customRole(...yA),addNewIssue);

const arr=['cityController','stateController','homeController']
router.route("/showIssue").get(isLoggedIn,customRole(...arr), showIssue);

router.route("/showAnnouncement").get(isLoggedIn, showAnnouncement);
router.route("/showAnnouncement/:id").get(isLoggedIn, showPersonalAnnouncement);



router.route("/showAllIssuesById").get(isLoggedIn, showIssuebyId);
router.route("/showIssue/:id").get(isLoggedIn, showPersonalIssue);
router.route("/modifyIssue").post(isLoggedIn,customRole(...arr), modifyIssue);
router.route("/mailAll").get(isLoggedIn,customRole(...arr), mailAll);

module.exports=router;