import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import verifyEmailToken from "../middlewares/nodemailer/verifyEmailToken.js";
import verifyPasswordToken from "../middlewares/nodemailer/verifyPasswordToken.js";
import { verifyToken } from "../middlewares/verifyToken.js";

router.delete("/", userController.deleteUser);
router.put("/", userController.updateUser);
router.get(
  "/activate-account",
  verifyEmailToken,
  userController.activateAccount
);
router.get("/reset-password", userController.verifyPasswordToken);
router.post(
  "/reset-password",
  verifyPasswordToken,
  userController.recoverPassword
);
router.get("/:id", verifyToken, userController.getUser);

export default router;
