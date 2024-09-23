import pool from "../config/DB.js";
import bcrypt from "bcrypt";
import {
  activateAccountQuery,
  deleteUserQuery,
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

export default {
  activateAccount,
  recoverPassword,
  deleteUser,
  updateUser,
};
