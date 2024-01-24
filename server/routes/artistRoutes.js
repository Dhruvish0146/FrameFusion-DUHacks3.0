const express = require('express')

const  {createArt} =  require("../controllers/artController.js");
const { getArtistDetails, updateArtist } = require('../controllers/artistController.js');

// import { verifyToken } from "../middleware/auth.js";

const router=express.Router();

router.post("/addArt",createArt);
router.get("/:artistId",getArtistDetails)
router.put("/updateArtist",updateArtist)

module.exports = router;