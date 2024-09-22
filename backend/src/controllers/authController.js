import bcrypt from "bcrypt";
import pool from "../config/DB.js";
import { generateToken } from "../services/jwt.js";
import { AddUserQuery, findUserQuery } from "../queries/queries.js";
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
    const user = response.rows[0];
    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user.user_id);
      return res.status(201).json({ message: "Login Successful", token });
    }
    res.status(401).json({ message: "Invalid Credentials" });
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

export default {
  login,
  register,
};
