import jwt from "jsonwebtoken";
export const generateToken = (id, role) => {
  console.log(role);
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "5h" });
};
