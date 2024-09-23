import pool from "../../config/DB.js";

const verifyEmailToken = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const response = await pool.query(
      "SELECT user_id , activated_account FROM users WHERE email_token = $1",
      [token]
    );
    console.log(response.rows[0]);
    if (response.rows.length === 0) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (response.rows[0].activated_account) {
      return res.status(400).json({ message: "Account already activated" });
    }
    req.user = response.rows[0].user_id;
    next();
  } catch (error) {
    {
      console.error("Error verifying email token:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default verifyEmailToken;
