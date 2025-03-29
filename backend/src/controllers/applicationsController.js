import pool from "../config/DB.js";
import {
  getApplicationsByJobIdQuery,
  getApplicationsQuery,
  getCountPendingApplicationsQuery,
  getSingleApplicationQuery,
  rejectApplicationQuery,
} from "../queries/queries.js";
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

const rejectApplicationController = async (req, res) => {
  try {
    const id = req.params.id;
    const values = [id];
    await pool.query(rejectApplicationQuery, values);
    res.status(200).json({ message: "Application Rejected" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  getApplicationsController,
  getSingleApplicationController,
  getApplicationsByJobIdController,
  getCountPendingApplicationsController,
  rejectApplicationController,
};
