import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import "dotenv/config";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const port = 8000;

try {
  await mongoose.connect(process.env.DATABASE);
} catch (err) {
  console.log(err);
}

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log("Server Running!!!!");
});
