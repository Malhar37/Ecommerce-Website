const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product didnt found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  //incomning form will capture the form which we had declared in front end(fromData)
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({ error: "problem with image" });
    }

    const {
      name,
      category,
      brand,
      camera,
      ram,
      rom,
      battery,
      description,
      price,
      stock,
      photo,
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !stock ||
      !brand ||
      !camera ||
      !ram ||
      !battery ||
      !rom
    ) {
      return res.status(400).json({
        error: err,
      });
    }

    var product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        //size in bytes or bites
        return res.status(400).json({
          error: "File size too big",
        });
      }
    }
    console.log(file);
    console.log("fields:- ", fields);
    product.photo.data = fs.readFileSync(file.photo.path);
    product.photo.contentType = file.photo.type;

    product.save((err, product) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.json({
        name: product.name,
        message: "save successfully",
      });
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
    next();
  }
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({ error: "problem with image" });
    }

    let product = req.product;
    //  .extend(object, sources)
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        //size in bytes or bites
        return res.status(400).json({
          error: "File size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    console.log(file);
    console.log("fields:- ", fields);

    product.save((err, product) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.json({
        name: product.name,
        message: "updated successfully",
      });
    });
  });
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .select("-photo")
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.json(products);
    });
};

exports.getCategories = (req, res) => {
  Product.distinct("category", (err, cate) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.json(cate);
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, removedProduct) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json({
      message: `${removedProduct.name} deleted successfully`,
    });
  });
};

// TODO:
// updateStock

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product.item._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) return res.status(400).json(err);

    next();
  });
};
