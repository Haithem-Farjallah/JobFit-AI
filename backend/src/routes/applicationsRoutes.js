import express from "express";
import applicaionsController from "../controllers/applicationsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get(
  "/:id",
  verifyToken,
  applicaionsController.getApplicationsController
);
export default router;
