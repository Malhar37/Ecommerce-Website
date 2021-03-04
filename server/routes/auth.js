var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { signup, signout, signin } = require("../controllers/auth");

//we are using check from exp-val for validating the entered fields by the user
router.post(
  "/signup",
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 char long"),
  check("name")
    .isLength({ min: 3 })
    .withMessage("name must be atleast 3 char long"),
  check("email").isEmail().withMessage("Email required"),
  // check("phone").isMobilePhone(),
  signup
);

router.get("/signout", signout);

router.post(
  "/signin",
  check("email").isEmail().withMessage("email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 char long"),
  signin
);

module.exports = router;