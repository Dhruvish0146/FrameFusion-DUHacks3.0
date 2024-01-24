const express = require('express')
const {
    registerArtist,
    registerUser,
    loginArtist,
    loginUser,
  } = require("../controllers/authController");

const router = express.Router();

router.post("/loginArtist", loginArtist);
router.post("/loginUser", loginUser);
router.post("/registerArtist", registerArtist);
router.post("/registerUser", registerUser);


module.exports = router;