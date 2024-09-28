import bcrypt from "bcrypt";
import pool from "../config/DB.js";
import { generateToken } from "../services/jwt.js";
import {
  AddUserQuery,
  emailQuery,
  findUserQuery,
  passwordResetQuery,
} from "../queries/queries.js";
import emailService from "../services/emailService.js";
import cryptoRandomString from "crypto-random-string";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const values = [email];
    const response = await pool.query(findUserQuery, values);
    if (response.rows.length === 0) {
      return res.status(401).json({ message: "Email not Found" });
    }
    let user = response.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(user.user_id);
    if (!user.activated_account) {
      const response = await pool.query(emailQuery, [
        cryptoRandomString({ length: 100, type: "url-safe" }),
        user.email,
      ]);
      user = response.rows[0];
      emailService.sendEmailVerification(
        user.email,
        user.firstname,
        user.email_token
      );
    }
    const {
      password: pass,
      email_token,
      reset_password_token,
      password_token_expiration,
      ...userData
    } = user;
    res.status(201).json({ message: "Login Successful", userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone_number } = req.body;
    if (!firstname || !lastname || !email || !password || !phone_number) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const values = [email];
    const response = await pool.query(findUserQuery, values);
    if (response.rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertValues = [
      firstname,
      lastname,
      email,
      hashedPassword,
      phone_number,
    ];
    await pool.query(AddUserQuery, insertValues);
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const PasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const values = [email];
    const response = await pool.query(findUserQuery, values);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }
    const user = response.rows[0];
    const resetToken = cryptoRandomString({ length: 100, type: "url-safe" });
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await pool.query(passwordResetQuery, [
      resetToken,
      expiration.toISOString(),
      user.user_id,
    ]);
    emailService.sendPasswordResetEmail(user.email, user.firstname, resetToken);
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  login,
  register,
  PasswordReset,
};
