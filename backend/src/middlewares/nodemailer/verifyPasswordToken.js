import pool from "../../config/DB.js";
const verifyPasswordToken = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const response = await pool.query(
      "SELECT user_id , password_token_expiration FROM users WHERE reset_password_token = $1",
      [token]
    );
    if (response.rows.length === 0) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const expiration = response.rows[0].password_token_expiration;
    if (expiration < new Date()) {
      return res.status(400).json({ message: "Token expired" });
    }
    req.user = response.rows[0].user_id;
    next();
  } catch (error) {
    console.error("Error verifying password token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default verifyPasswordToken;
