const { Order } = require("../models/order");

exports.getOrderById = (req, res, next, orderId) => {
  Order.findById(orderId)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json(err);
      }
      req.order = order;
      next();
    });
};



exports.createOrder = (req, res) => {
  req.body.order.userId = req.profile._id;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json({ msg: "order created", order: order });
  });
};

exports.getAllOrders = (req, res) => {
  const userId = req.profile._id;
  Order.find({userId: userId}).populate("products.item", "-photo")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(orders);
    });
};
