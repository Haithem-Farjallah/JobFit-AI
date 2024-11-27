import pool from "../config/DB.js";
import {
  applyJobQuery,
  deleteQuery,
  existingemailQuery,
  getJobsQuery,
  getJobsRh,
  getSingleJobQuery,
  postJobQuery,
  updateJobQuery,
  validateJobIdQuery,
} from "../queries/queries.js";
import { deleteFile } from "../middlewares/multer.js";
import extractPdfData from "../services/ai/resumeService.js";
import { runGemeni } from "../services/ai/gemeni-start.js";
const getJobsController = async (req, res) => {
  try {
    const values = [new Date().toISOString()];
    const jobs = await pool.query(getJobsQuery, values);
    return res.status(200).json({ jobs: jobs.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSingleJobController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Job id is required" });
    }
    const job = await pool.query(getSingleJobQuery, [id]);
    if (!job.rows[0]) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ job: job.rows[0] });
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
    const {
      firstname,
      lastname,
      email,
      phone_number,
      candidat_note,
      linkedin_url,
    } = req.body;
    if (
      !firstname?.trim() ||
      !lastname?.trim() ||
      !email?.trim() ||
      !candidat_note?.trim() ||
      !phone_number?.trim() ||
      !linkedin_url?.trim()
    ) {
      deleteFile(req.file.filename);
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingemail = await pool.query(existingemailQuery, [email, job_id]);
    console.log(existingemail.rows[0].exists);
    if (existingemail.rows[0].exists) {
      deleteFile(req.file.filename);
      return res
        .status(403)
        .json({ message: "You have already applied for this job." });
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
      linkedin_url,
    ];
    const application = await pool.query(applyJobQuery, values);
    await pool.query(
      "UPDATE jobs SET application_count = application_count + 1 WHERE job_id = $1",
      [job_id]
    );
    const application_id = application.rows[0].id;
    res.status(201).json({ message: "Application Submitted" });
    //extract data from candidat resume
    const resumeData = await extractPdfData(req.file.path); // Use await to get the extracted PDF text// This will now log the CV text content
    const aiResult = await runGemeni(valid.rows[0], resumeData);
    let matchPercentage = aiResult.match_percentage;
    matchPercentage = parseFloat(matchPercentage.replace("%", ""));
    await pool.query(
      "INSERT INTO results (application_id, job_keywords, resume_keywords,matched_keywords,score,summary) VALUES ($1, $2, $3,$4,$5,$6)",
      [
        application_id,
        aiResult.job_description_keywords,
        aiResult.resume_keywords,
        aiResult.matched_keywords,
        matchPercentage,
        aiResult.summary,
      ]
    );
  } catch (error) {
    deleteFile(req.file?.filename);
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getJobsByRhIdController = async (req, res) => {
  try {
    const rh_id = req.params.rhId;
    const values = [rh_id];
    const jobs = await pool.query(getJobsRh, values);
    res.status(200).json({ jobs: jobs.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getJobsController,
  getSingleJobController,
  postjobController,
  updateJobController,
  deleteJobController,
  applyJobController,
  getJobsByRhIdController,
};
