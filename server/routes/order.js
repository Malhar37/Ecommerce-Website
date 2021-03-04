const express = require("express");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

const {
  getOrderById,
  createOrder,
  getAllOrders,
} = require("../controllers/order");
const { updateStock } = require("../controllers/product");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
var router = express.Router();

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);
router.post(
  "/order/:userId",
  isSignedIn,
  isAuthenticated,
  getAllOrders
);

module.exports = router;
