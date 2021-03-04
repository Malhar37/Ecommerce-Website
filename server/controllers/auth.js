const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// controllers
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.send({ message: "User signed out" });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let temp = errors.array();
    return res.status(422).json({
      error: temp[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    } else if (err) {
      return res.status(401).json(err);
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email, role, phone } = user;

    return res.json({ token, user: { _id, name, email, role, phone } });
  });
};

exports.signup = (req, res) => {
   const result = validationResult(req);

  if (!result.isEmpty()) {
    let temp = result.array();
    return res.status(422).json({
      error: temp[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    const { email, name, phone } = user;
    res.json({ user: { name, email, phone } });
  });
};

//protected routes and middlewares

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"]
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "Your are not admin",
    });
  }
  next();
};
