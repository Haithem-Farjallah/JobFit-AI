import e from "express";

/******************************User queries************************** */
export const findUserQuery = "SELECT * FROM users WHERE email = $1 ";
export const AddUserQuery =
  "INSERT INTO users (firstname,lastname,email, password,phone_number) VALUES ($1, $2, $3, $4, $5)";

/******************************Job queries************************** */
export const getJobsQuery = "SELECT * FROM jobs  ORDER BY created_at DESC";
export const postJobQuery =
  "INSERT INTO jobs (title,description,min_salary,max_salary,experience_level,work_type,expiration_date,posted_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
export const updateJobQuery = (data, id) => {
  let setClauses = [];
  let values = [];
  Object.keys(data).forEach((key, index) => {
    setClauses.push(`${key}=$${index + 1}`);
    values.push(data[key]);
  });
  values.push(id);
  const query = `UPDATE jobs SET ${setClauses.join(",")} WHERE  job_id=$${
    setClauses.length + 1
  } `;
  console.log(query);
  return { query, values };
};
export const deleteQuery = `DELETE FROM jobs WHERE job_id = $1`;

export const applyJobQuery = `INSERT INTO applications (job_id,firstname,lastname,email,phone_number,resume_url,candidat_note) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
export const validateJobIdQuery = `SELECT title,description,experience_level FROM jobs WHERE job_id = $1`;
