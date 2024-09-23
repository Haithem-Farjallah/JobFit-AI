import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.PasswordReset);
export default router;
