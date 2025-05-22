import { application } from "express";
import transporter from "../config/nodemailer.js";
import emailTemplate from "../utils/emailTemplate.js";
const sendEmailVerification = async (email, username, token) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Activate Account",
      text: "Click the link to activate your account",
      html: emailTemplate.activateAccount(username, token),
    });
  } catch (error) {
    console.log(error);
  }
};
const sendPasswordResetEmail = async (email, username, token) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Recover Password",
      text: "Click the link to Recover your Password",
      html: emailTemplate.passwordRecovery(username, token),
    });
  } catch (error) {
    console.log(error);
  }
};
const sendRejectionEmail = async (email, jobTitle) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Application Rejected",
      html: emailTemplate.rejectionTemplate(jobTitle),
    });
  } catch (error) {
    console.log(error);
  }
};

const sendAcceptanceEmail = async (email, jobTitle) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Application Accepted",
      html: emailTemplate.acceptanceTemplate(jobTitle),
    });
  } catch (error) {
    console.log(error);
  }
};
export default {
  sendEmailVerification,
  sendPasswordResetEmail,
  sendRejectionEmail,
  sendAcceptanceEmail,
};
