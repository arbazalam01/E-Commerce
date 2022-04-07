import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth.js";
import { getUser, getUserById, updateUser } from "../controllers/user.js";

const router = Router();

router.param("/userId/", getUserById);
router.get("user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, updateUser);

export default router;
