const express=require("express");
const router=express.Router();

const {signup,login,logout,forgotPassword,passwordReset, getLoggedInUserDetails}=require("../controllers/userContoller")

const {isLoggedIn,customRole}=require("../middlewares/user");
const { addNewAnnouncement, showAnnouncement ,showPersonalAnnouncement} = require("../controllers/announcementController");
const {addNewIssue, showIssue,showIssuebyId} = require("../controllers/issueController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);

router.route("/addNewAnnouncement").post(isLoggedIn,addNewAnnouncement);
router.route("/addNewIssue").post(isLoggedIn,addNewIssue);

const arr=['cityController','stateController','homeController']
router.route("/showIssue").get(isLoggedIn,customRole(...arr), showIssue);

router.route("/showAnnouncement").get(isLoggedIn, showAnnouncement);
router.route("/showAnnouncement/:id").get(isLoggedIn, showPersonalAnnouncement);



router.route("/showAllIssuesById").get(isLoggedIn, showIssuebyId);

module.exports=router;