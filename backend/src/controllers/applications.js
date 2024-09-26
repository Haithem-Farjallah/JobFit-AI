import pool from "../config/DB.js";
import { getApplicationsQuery } from "../queries/queries.js";
const getApplicationsController = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const job_id = req.params.id;
    const { query, values } = getApplicationsQuery(limit, offset, job_id);

    const applications = await pool.query(query, values);
    return res.status(200).json(applications.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default {
  getApplicationsController,
};
