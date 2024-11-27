import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
router.post("/login", authController.login);
router.post("/forgot-password", authController.PasswordReset);
router.get("/verifyJwt", verifyToken, (req, res) => {
  res.status(200).json({ message: "Valid Token" });
});
export default router;
