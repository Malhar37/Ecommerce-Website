const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new Schema({
  item: {
    type: ObjectId,
    ref: "Product",
  },
  count: Number,
  price: Number,
  total: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: Number,
    razorpay_order_id: String,
    razorpay_signature :String,
    address: String,
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Delivered", "Processing", "Shipped", "Received"],
    },
    updated: Date,
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
