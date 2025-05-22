import pool from "../config/DB.js";
import {
  getApplicationsByJobIdQuery,
  getApplicationsQuery,
  getCountAcceptedApplicationsQuery,
  getCountPendingApplicationsQuery,
  getCountRejectedApplicationsQuery,
  getSingleApplicationQuery,
  updateStatusApplicationQuery,
} from "../queries/queries.js";
import emailService from "../services/emailService.js";
const getApplicationsController = async (req, res) => {
  try {
    const id = req.params.id;
    const values = [id];

    const applications = await pool.query(getApplicationsQuery, values);
    return res.status(200).json(applications.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSingleApplicationController = async (req, res) => {
  try {
    const id = req.params.id;
    const application = await pool.query(getSingleApplicationQuery, [id]);
    res.status(200).json(application.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getApplicationsByJobIdController = async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const values = [job_id];

    const applications = await pool.query(getApplicationsByJobIdQuery, values);
    res.status(200).json(applications.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getCountAcceptedApplicationsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.userId != id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const count = await pool.query(getCountAcceptedApplicationsQuery, [id]);
    res.status(200).json(count.rows[0].count);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getCountRejectedApplicationsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.userId != id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const count = await pool.query(getCountRejectedApplicationsQuery, [id]);
    res.status(200).json(count.rows[0].count);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const getCountPendingApplicationsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.userId != id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const count = await pool.query(getCountPendingApplicationsQuery, [id]);
    res.status(200).json(count.rows[0].count);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateApplicationController = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const result = await pool.query(updateStatusApplicationQuery, [status, id]);

    const jobId = result.rows[0]?.job_id;
    if (!jobId) {
      return res.status(404).json({ message: "Application or Job not found" });
    }

    // Fetch job title
    const job = await pool.query("SELECT title FROM jobs WHERE job_id = $1", [
      jobId,
    ]);
    const jobTitle = job.rows[0]?.title || "the job";

    res.status(200).json({ message: `Application ${status}` });
    // Send email based on status
    if (status === "rejected") {
      await emailService.sendRejectionEmail(email, jobTitle);
    } else if (status === "accepted") {
      await emailService.sendAcceptanceEmail(email, jobTitle);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  getApplicationsController,
  getSingleApplicationController,
  getApplicationsByJobIdController,
  getCountPendingApplicationsController,
  getCountAcceptedApplicationsController,
  getCountRejectedApplicationsController,
  updateApplicationController,
};
