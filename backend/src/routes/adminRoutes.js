import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import adminController from "../controllers/adminController.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { Roles } from "../config/Roles.js";
const router = express.Router();

router.get(
  "/rh",
  verifyToken,
  verifyRole([Roles.ADMIN]),
  adminController.getRHListController
);
router.post(
  "/add-rh",
  verifyToken,
  verifyRole([Roles.ADMIN]),
  adminController.addRHController
);

export default router;
