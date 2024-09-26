import express from "express";
import applicaionsController from "../controllers/applications.js";
const router = express.Router();

router.get("/:job_id", applicaionsController.getApplicationsController);
export default router;
