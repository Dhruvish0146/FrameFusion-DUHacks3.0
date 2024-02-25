const express = require('express')

const  {createArt} =  require("../controllers/artController.js");
const { getArtistDetails, updateArtist, getAllArtist } = require('../controllers/artistController.js');
const { resetPassword } = require('../controllers/authController.js');

// import { verifyToken } from "../middleware/auth.js";

const router=express.Router();

router.post("/addArt",createArt);
router.get("/:artistId",getArtistDetails)
router.put("/updateArtist",updateArtist)
router.put("/changePass",resetPassword);
router.get("/getAllArtist",getAllArtist);

module.exports = router;