const  express = require('express')
const {getUserDetails, updateUserDetails, ChangePass} = require("../controllers/userController");
const { resetPassword } = require('../controllers/authController');
const router=express.Router();

router.get("/:userId",getUserDetails);
router.put("/updateUserDetails",updateUserDetails);
router.put("/changePass",resetPassword);


module.exports = router;