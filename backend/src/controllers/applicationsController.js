import pool from "../config/DB.js";
import { getApplicationsQuery } from "../queries/queries.js";
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
export default {
  getApplicationsController,
};
