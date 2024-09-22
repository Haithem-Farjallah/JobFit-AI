import pool from "../config/DB.js";
import {
  applyJobQuery,
  deleteQuery,
  getJobsQuery,
  postJobQuery,
  updateJobQuery,
  validateJobIdQuery,
} from "../queries/queries.js";
import { deleteFile } from "../middlewares/multer.js";
import extractPdfData from "../services/ai/resumeService.js";
import { runGemeni } from "../services/ai/gemeni-start.js";
const getJobsController = async (req, res) => {
  try {
    const jobs = await pool.query(getJobsQuery);
    return res.status(200).json({ jobs: jobs.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const postjobController = async (req, res) => {
  try {
    const {
      title,
      description,
      min_salary,
      max_salary,
      experience_level,
      work_type,
      expiration_date,
    } = req.body;
    if (
      !title ||
      !description ||
      !experience_level ||
      !work_type ||
      !expiration_date
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", data: req.body });
    }
    const values = [
      title,
      description,
      min_salary ? min_salary : 0,
      max_salary ? max_salary : 0,
      experience_level,
      work_type,
      expiration_date,
      req.userId,
    ];
    await pool.query(postJobQuery, values);
    res.status(201).json({ message: "Job Posted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateJobController = async (req, res) => {
  try {
    const id = req.params.id;
    const { query, values } = updateJobQuery(req.body, id);
    await pool.query(query, values);
    return res.status(200).json({ message: "Job Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteJobController = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query(deleteQuery, [id]);
    return res.status(200).json({ message: "Job Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const applyJobController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }
    const job_id = req.params.id;
    const valid = await pool.query(validateJobIdQuery, [job_id]);
    if (!valid.rows[0]) {
      deleteFile(req.file.filename);
      return res.status(404).json({ message: "Job not found" });
    }
    const { firstname, lastname, email, phone_number, candidat_note } =
      req.body;
    if (!firstname || !lastname || !email || !candidat_note || !phone_number) {
      deleteFile(req.file.filename);
      return res.status(400).json({ message: "Missing required fields" });
    }
    const resume_url = req.file.filename;
    const values = [
      job_id,
      firstname,
      lastname,
      email,
      phone_number,
      resume_url,
      candidat_note,
    ];
    await pool.query(applyJobQuery, values);
    res.status(201).json({ message: "Application Submitted" });
    //extract data from candidat resume
    const resumeData = await extractPdfData(req.file.path); // Use await to get the extracted PDF text// This will now log the CV text content
    runGemeni(valid.rows[0], resumeData);
  } catch (error) {
    deleteFile(req.file?.filename);
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getJobsController,
  postjobController,
  updateJobController,
  deleteJobController,
  applyJobController,
};
