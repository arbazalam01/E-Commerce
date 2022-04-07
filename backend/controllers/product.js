import Product from "../models/product.js";
import Forms from "formidable";
// import { has } from "loadash";
import fs from "fs";

const { IncomingForm } = Forms;

export const getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product Not Found",
        });
      }
      req.product = product;
      next();
    });
};

export const createProduct = (req, res) => {
  let form = new IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Image Problem",
      });
    }

    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too high",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, prod) => {
      if (err) {
        return res.status(400).json({
          error: "DB save failed",
        });
      }
      res.json(prod);
    });
  });
};

export const getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

export const photo = (req, res, next) => {
  if (req.product.photo) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
