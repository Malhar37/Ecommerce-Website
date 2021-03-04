const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    camera: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    ram: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    battery: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    rom: {
      type: String,
      trim: true,
      maxlength: 100,
      required: true,
    },
    color: {
      type: String,
      trim: true,
      maxlength: 100,
      required: true,
    },
    price: {
      type: Number,
      maxlength: 32,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
