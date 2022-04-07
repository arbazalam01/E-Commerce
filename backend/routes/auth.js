import { Router } from "express";
import { signout, signup, signin, isSignedIn } from "../controllers/auth.js";
import { check } from "express-validator";

const router = Router();

router.post(
  "/signup",
  check("name").isLength({ min: 3 }).withMessage("Must be atleast 3 chars"),
  check("email").isEmail().withMessage("Must be atleast 3 chars"),
  signup
);
router.post(
  "/signin",
  check("email").isEmail().withMessage("Must be Email"),
  signin
);
router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.send("Protected Route");
});

export default router;
