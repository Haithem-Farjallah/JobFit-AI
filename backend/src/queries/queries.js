/******************************User queries************************** */
export const findUserQuery = "SELECT * FROM users WHERE email = $1 ";
export const AddUserQuery =
  "INSERT INTO users (firstname,lastname,email, password,phone_number) VALUES ($1, $2, $3, $4, $5)";
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

export const applyJobQuery = `INSERT INTO applications (job_id,firstname,lastname,email,phone_number,resume_url,candidat_note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
export const validateJobIdQuery = `SELECT title,description,experience_level FROM jobs WHERE job_id = $1`;

// ******************************Applications queries************************** */

export const getApplicationsQuery = (limit, offset, job_id) => {
  return {
    query: `SELECT * FROM applications WHERE job_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
    values: [job_id, limit, offset],
  };
};
