import Category from "../models/category.js";

export const getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });

  next();
};

export const createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not Able to save Category in DB",
      });
    }
    res.json({ category });
  });
};

export const getCategory = (req, res) => {
  return res.json(req.category);
};
export const getAllCategory = (req, res) => {
  Category.find({}).exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories found",
      });
    }
    res.json(items);
  });
};

export const updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update",
      });
    }
    res.json(updateCategory);
  });
};

export const deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete",
      });
    }
    res.json({ msg: "Successful deleted" });
  });
};
