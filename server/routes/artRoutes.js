const express = require('express');
const { getArts , getArt, deleteArt} = require('../controllers/artController');
const router = express.Router();

router.get("/getArts",getArts);
router.get("/:artId",getArt)
router.delete("/:artId",deleteArt);

module.exports = router;

// import express from "express";
// import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
// import { verifyToken } from "../middleware/auth.js";

// const router = express.Router();

// //read
// router.get("/", verifyToken,getFeedPosts);
// router.get("/:userId/posts", verifyToken, getUserPosts);

// //update
// router.patch("/:id/like", verifyToken, likePost); 

// export default router;

// import express from "express";
// import { createArt } from "../controllers/artController.js";
// // import { verifyToken } from "../middleware/auth.js";

// const router=express.Router();

// router.route("/create",createArt);

// export default router;

