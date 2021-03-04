const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in db",
      });
    }

    req.category = category;
    next();
  });
};
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json(err, {
        error: "Category not found in db",
      });
    }
    return res.json(category);
  });
};
exports.getCategory = (req, res) => {
  return res.json(req.category);
};
exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json(err, { error: "no category found" });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "updation failed",
      });
    }
    return res.json(category);
  });
};
