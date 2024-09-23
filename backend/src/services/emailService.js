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
export default { sendEmailVerification, sendPasswordResetEmail };
