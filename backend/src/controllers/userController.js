import pool from "../config/DB.js";
import bcrypt from "bcrypt";
import {
  activateAccountQuery,
  deleteUserQuery,
  getUserQuery,
  recoverPasswordQuery,
  updateUserQuery,
} from "../queries/queries.js";

const updateUser = async (req, res) => {
  try {
    const id = req.userId;
    const { query, values } = updateUserQuery(req.body);
    await pool.query(query, [...values, id]);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.userId;
    await pool.query(deleteUserQuery, [id]);
    res.status(200).json({ message: "account delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const activateAccount = async (req, res) => {
  try {
    const id = req.user;
    await pool.query(activateAccountQuery, [id]);
    res.status(200).json({ message: "Account activated successfully" });
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyPasswordToken = async (req, res) => {
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
    res.status(200).json({ message: "token is valid" });
  } catch (error) {
    console.error("Error verifying password token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const recoverPassword = async (req, res) => {
  try {
    const id = req.user;
    const newPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(recoverPasswordQuery, [hashedPassword, id]);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error recovering password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const data = await pool.query(getUserQuery, [id]);
    if (data.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(data.rows[0]);
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  activateAccount,
  recoverPassword,
  deleteUser,
  updateUser,
  verifyPasswordToken,
  getUser,
};
