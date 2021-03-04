const express = require("express");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { createProduct, getProductById, updateProduct, photo, getProduct, getAllProducts, getCategories, deleteProduct } = require("../controllers/product");
const { getUserById } = require("../controllers/user");
var router = express.Router();

router.param("userId", getUserById);
router.param("productId", getProductById);

//GET
router.get("/products", getAllProducts );
// TODO:
router.get("/products/categories", getCategories);
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo );

// POST
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct );

// PUT
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

//DELETE
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)
module.exports = router;
