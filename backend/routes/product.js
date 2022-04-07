import { Router } from "express";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth.js";
import {
  createProduct,
  getProduct,
  getProductById,
  photo,
} from "../controllers/product.js";
import { getUserById } from "../controllers/user.js";

const router = Router();

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

export default router;
