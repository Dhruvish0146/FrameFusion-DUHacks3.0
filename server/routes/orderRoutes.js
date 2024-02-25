const  express = require('express');
const { createOrder, validateOrder, updateArtworkAndUser } = require('../controllers/orderController');
const router=express.Router();

router.post("/", createOrder);
router.post("/validate", validateOrder);
router.post("/updateAfterPayment",updateArtworkAndUser);


module.exports = router;