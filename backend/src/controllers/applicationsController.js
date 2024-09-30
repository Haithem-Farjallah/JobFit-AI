import pool from "../config/DB.js";
import {
  getApplicationsByJobIdQuery,
  getApplicationsQuery,
  getSingleApplicationQuery,
} from "../queries/queries.js";
const getApplicationsController = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const id = req.params.id;
    const values = [id, limit, offset];

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
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const job_id = req.params.job_id;
    const values = [job_id, limit, offset];

    const applications = await pool.query(getApplicationsByJobIdQuery, values);
    res.status(200).json(applications.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  getApplicationsController,
  getSingleApplicationController,
  getApplicationsByJobIdController,
};
