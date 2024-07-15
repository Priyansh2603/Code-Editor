const express = require('express');
// Correct import with file extension
const { authLogin, authRegister, getUser, updateUser } = require("../controllers/authcontrollers.js");

const router = express.Router();
router.post("/login",authLogin);
router.post("/register",authRegister);
router.post("/getuser",getUser);
router.patch("/update/:userId",updateUser);
const authroute = router;
module.exports = authroute;