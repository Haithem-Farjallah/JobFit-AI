/******************************User queries************************** */
export const findUserQuery = "SELECT * FROM users WHERE email = $1 ";

export const emailQuery =
  "UPDATE users SET email_token = $1 WHERE email = $2 RETURNING *";
export const activateAccountQuery =
  "UPDATE users SET activated_account = true , email_token = NULL WHERE user_id = $1";
export const passwordResetQuery =
  "UPDATE users SET reset_password_token = $1, password_token_expiration = $2  WHERE user_id = $3";
export const recoverPasswordQuery =
  "UPDATE users SET password = $1,password_token_expiration=NULL,reset_password_token=NULL WHERE user_id = $2";
export const deleteUserQuery = "delete from users where user_id=$1";
export const updateUserQuery = (data) => {
  const setClauses = [];
  const values = [];
  Object.keys(data).forEach((key, index) => {
    setClauses.push(`${key}=$${index + 1}`);
    values.push(data[key]);
  });
  const query = `Update users set ${setClauses.join(",")} where user_id=$${
    values.length + 1
  }`;
  return {
    query,
    values,
  };
};
/******************************Job queries************************** */
export const getJobsQuery = `SELECT job_id , title, experience_level, work_type,expiration_date FROM jobs WHERE expiration_date > $1 ORDER BY created_at DESC`;
export const getSingleJobQuery =
  "SELECT J.title, J.description,J.min_salary,J.max_salary,J.experience_level,J.work_type,J.expiration_date,J.created_at,J.skills,U.firstname,U.lastname,U.image_url,U.email,U.phone_number FROM jobs As J INNER JOIN users as U ON J.posted_by = U.user_id WHERE J.job_id = $1 ";
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

export const applyJobQuery = `INSERT INTO applications (job_id,firstname,lastname,email,phone_number,resume_url,candidat_note,linkedin_url) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING id`;
export const validateJobIdQuery = `SELECT title,description,experience_level FROM jobs WHERE job_id = $1`;

export const getJobsRh =
  "select job_id,title,experience_level,work_type,application_count,created_at,expiration_date from jobs where posted_by=$1";
// ******************************Applications queries************************** */

export const existingemailQuery =
  "select exists(select 1 from applications where email=$1 and job_id=$2)";
export const getApplicationsQuery = `SELECT J.title, A.id, A.firstname, A.lastname, A.created_at, R.score
FROM applications AS A
JOIN jobs AS J ON A.job_id = J.job_id
JOIN results AS R ON A.id = R.application_id
WHERE J.posted_by = $1  
ORDER BY R.score DESC`;

export const getSingleApplicationQuery =
  "SELECT A.firstname ,A.lastname,A.email,A.hiring_stage,A.phone_number,A.candidat_note,A.resume_url,A.linkedin_url,A.job_id,R.score,R.matched_keywords,R.summary from applications as A JOIN results as R ON A.id = R.application_id WHERE A.id = $1";
export const getApplicationsByJobIdQuery =
  "Select A.id, A.firstname,A.lastname,A.hiring_stage, A.created_at,R.score from applications as A JOIN results as R ON A.id = R.application_id WHERE A.job_id = $1 ORDER BY A.created_at DESC ";
export const rejectApplicationQuery =
  "UPDATE applications SET hiring_stage = 'rejected' WHERE id = $1";

// ******************************Admin queries************************** */
export const getAllRHQuery =
  "select U.firstname, U.lastname ,U.email,U.phone_number,U.image_url,count(J.posted_by) as Jobs_posted from users as U full join jobs as J on J.posted_by=U.user_id group by U.user_id ";
export const AddRHQuery =
  "INSERT INTO users (firstname,lastname,email, password,phone_number,role) VALUES ($1, $2, $3, $4, $5,$6)";
