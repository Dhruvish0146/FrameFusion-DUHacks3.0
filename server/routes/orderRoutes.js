const  express = require('express');
const { createOrder, validateOrder } = require('../controllers/orderController');
const router=express.Router();

router.post("/", createOrder);
router.post("/validate", validateOrder);


module.exports = router;