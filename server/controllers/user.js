const User = require("../models/user");

const hideUserPrivateInfo = (user) => {
  return {
    name: user.name,
    _id: user._id,
    email: user.email,
    phone: user.phone,
    role: user.role,
    lastname: user.lastname,
    purchases: user.purchases,
  };
};

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    } else if (err) {
      return res.status(401).json(err);
    }
    req.profile = hideUserPrivateInfo(user);
    next();
  });
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "updation not successful",
        });
      }
      return res.json(hideUserPrivateInfo(user));
    }
  );
};
// TODO:
exports.userPurchaseList = () => {};
exports.deleteUser = () => {};
// MIDDLEWARES
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((element) => {
    purchases.push({
      product: element.item,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchasesList) => {
      if (err) {
        return res.status(400).json(err);
      }
      next();
    }
  );
};
