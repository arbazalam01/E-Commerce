import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const productCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = Schema(
  {
    products: [productCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", orderSchema);

export { Order, ProductCart };
