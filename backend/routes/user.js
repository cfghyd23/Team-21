const express=require("express");
const router=express.Router();

const {signup,login,logout,forgotPassword,passwordReset, getLoggedInUserDetails}=require("../controllers/userContoller")

const {isLoggedIn,customRole}=require("../middlewares/user");
const { addNewAnnouncement } = require("../controllers/announcementController");
const {addNewIssue, showIssue} = require("../controllers/issueController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").get(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);

router.route("/addNewAnnouncement").post(isLoggedIn,addNewAnnouncement);
router.route("/addNewIssue").post(isLoggedIn,addNewIssue);
router.route("/showIssue").get(isLoggedIn,customRole(['homeController','cityController','stateController']), showIssue);


module.exports=router;