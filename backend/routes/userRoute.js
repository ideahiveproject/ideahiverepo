const express=require('express');
const {registerUser, loginUser, logout, loginStatus, getUser,updateUser,changePassword,forgotPassword,resetPassword}=require('../controllers/userController');
const router=express.Router();
const protect=require('../middleware/auth')

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.get("/getuser",  getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
module.exports=router;