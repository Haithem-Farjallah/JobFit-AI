const activateAccount = (username, token) => {
  return `
           <html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
        .button { 
            background-color: #007bff; 
            border-radius: 5px; 
            padding: 10px 20px;
            display: inline-block; 
            text-decoration: none;
        }.link{
            color: white;
             }
        .footer { margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Activate Your Account</h2>
        <p>Dear ${username},</p>
        <p>Thank you for registering with us! We’re excited to have you on board.</p>
        <p>To complete your registration and activate your account, please click the button below:</p>
        <a href="${process.env.FRONTEND_URL}/auth/activate-account?token=${token}" class="button"><span class="link">Activate Your Account</span></a>
        <p>If you did not create an account, please disregard this email.</p>
        <div class="footer">
            <p>Best regards</p>
        </div>
    </div>
</body>
</html>

        `;
};

const passwordRecovery = (username, token) => {
  return `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                    .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
                    .button { 
                    background-color: #007bff; 
                    border-radius: 5px; 
                    padding: 10px 20px;
                    display: inline-block; 
                    text-decoration: none;
                    }
                    .link{
                    color: white;
                    }
                    .footer { margin-top: 20px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Password Recovery Request</h2>
                    <p>Dear ${username},</p>
                    <p>We received a request to reset your password for your account. If you did not request this, you can safely ignore this email.</p>
                    <p>To reset your password, please click the button below:</p>
                    <a href="${process.env.FRONTEND_URL}/auth/recover-password?token=${token}" class="button"><span class="link">Reset Your Password</span></a>
                    <p>This link will expire in <b> 1 day </b>, so please use it as soon as possible.</p>
                    <div class="footer">
                        <p>Best regards</p>
                    </div>
                </div>
            </body>
            </html>
        `;
};

const rejectionTemplate = (application) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f7;
          padding: 30px;
          color: #333;
        }
        .container {
          max-width: 600px;
          background-color: #fff;
          margin: 0 auto;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          font-size: 22px;
          font-weight: bold;
          color: #c62828;
        }
        .content {
          margin-top: 20px;
          font-size: 16px;
          line-height: 1.6;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Application Update</div>
        <div class="content">
          <p>Dear Candidate,</p>
          <p>Thank you for taking the time to apply for the <strong>${application}</strong> position .</p>
          <p>After careful consideration, we regret to inform you that your application was not selected for further steps in the hiring process.</p>
          <p>We truly appreciate your interest in joining our team and the effort you put into your application. We wish you all the best in your job search and future career.</p>
          <p>Sincerely</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
const acceptanceTemplate = (application) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 10px;
      }
      h2 {
        color: #2e7d32;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Congratulations!</h2>
      <p>Dear Candidate,</p>
      <p>
        We are pleased to inform you that your application for the <strong>${application}</strong> position has been accepted.
      </p>
      <p>
        Our team was impressed with your qualifications and experience, and we are excited to move forward with you.
      </p>
      <p>
        You will receive further details about the next steps in the coming days.
      </p>
      <p>Welcome aboard!</p>
      <p>Best regards,<br />The HR Team</p>
      <div class="footer">JobFit-AI Recruitment Team</div>
    </div>
  </body>
</html>
`;
};
export default {
  passwordRecovery,
  activateAccount,
  rejectionTemplate,
  acceptanceTemplate,
};
