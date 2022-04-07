import { Router } from "express";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth.js";
import {
  deleteCategory,
  getAllCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  createCategory,
} from "../controllers/category.js";
import { getUserById } from "../controllers/user.js";

const router = Router();

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

export default router;
