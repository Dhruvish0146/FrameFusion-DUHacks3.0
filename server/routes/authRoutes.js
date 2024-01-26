const express = require('express')
const {
    registerArtist,
    registerUser,
    loginArtist,
    loginUser,
    resetPassword,
  } = require("../controllers/authController");

const router = express.Router();

router.post("/loginArtist", loginArtist);
router.post("/loginUser", loginUser);
router.post("/registerArtist", registerArtist);
router.post("/registerUser", registerUser);
router.put("/resetPassword",resetPassword);


module.exports = router;