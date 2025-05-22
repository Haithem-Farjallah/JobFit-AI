import express from "express";
import applicaionsController from "../controllers/applicationsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { Roles } from "../config/Roles.js";
const router = express.Router();

router.get(
  "/:id",
  verifyToken,
  applicaionsController.getApplicationsController
);
router.get(
  "/single/:id",
  verifyToken,
  applicaionsController.getSingleApplicationController
);
router.get(
  "/job/:job_id",
  verifyToken,
  applicaionsController.getApplicationsByJobIdController
);
router.patch(
  "/:id",
  verifyToken,
  applicaionsController.updateApplicationController
);
router.get(
  "/count/:id",
  verifyToken,
  verifyRole([Roles.RH]),
  applicaionsController.getCountPendingApplicationsController
);
router.get(
  "/accepted/:id",
  verifyToken,
  verifyRole([Roles.RH]),
  applicaionsController.getCountAcceptedApplicationsController
);
router.get(
  "/rejected/:id",
  verifyToken,
  verifyRole([Roles.RH]),
  applicaionsController.getCountRejectedApplicationsController
);
export default router;
