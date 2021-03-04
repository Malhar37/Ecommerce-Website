const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getCategoryById, getAllCategories, getCategory, createCategory, updateCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const router = express.Router();

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.get("/categories", getAllCategories);
router.get("/category/:categoryId", getCategory);

router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

module.exports = router