const express = require("express");
const { makePayment } = require("../controllers/razorpay");
const router = express.Router();

router.post("/razorpay", makePayment);

module.exports = router;