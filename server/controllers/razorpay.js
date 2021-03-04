const Razorpay = require("razorpay");

exports.makePayment = (req, res) => {
  amount = JSON.parse(req.body.amount);

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  const order = instance.orders.create(options, (err, order) => {
    if (err) return res.status(400).json(err);

    return res.json(order);
  });
};
