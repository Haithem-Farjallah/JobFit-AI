import pool from "../config/DB.js";
import { Roles } from "../config/Roles.js";
import {
  AddRHQuery,
  findUserQuery,
  getAllRHQuery,
} from "../queries/queries.js";
import bcrypt from "bcrypt";
const getRHListController = async (req, res) => {
  try {
    const data = await pool.query(getAllRHQuery);
    return res.status(200).json(data.rows);
  } catch (error) {
    return res.status(500).json({ message: "internal server error " });
  }
};

const addRHController = async (req, res) => {
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
      Roles.RH,
    ];
    await pool.query(AddRHQuery, insertValues);
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export default {
  getRHListController,
  addRHController,
};
