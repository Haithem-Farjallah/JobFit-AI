import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import jobController from "../controllers/jobsController.js";
import { limiter } from "../middlewares/express-rate-limit.js";
import { uploadSingle } from "../middlewares/multer.js";
const router = express.Router();

router.get("/", jobController.getJobsController);
router.get("/:id", jobController.getSingleJobController);
router.post("/", verifyToken, jobController.postjobController);
router.patch("/:id", verifyToken, jobController.updateJobController);
router.delete("/:id", verifyToken, jobController.deleteJobController);
router.get(
  "/rh-jobs/:rhId",
  verifyToken,
  jobController.getJobsByRhIdController
);
router.post(
  "/:id/applications",
  limiter,
  uploadSingle,
  jobController.applyJobController
);
//limit apply  to 10 per 15 minutes for a single IP
export default router;
