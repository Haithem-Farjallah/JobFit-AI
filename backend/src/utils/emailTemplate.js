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
        <a href="http://yourwebsite.com/activate?token=${token}" class="button"><span class="link">Activate Your Account</span></a>
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
                    <a href="http://yourwebsite.com/reset-password?token=${token}" class="button"><span class="link">Reset Your Password</span></a>
                    <p>This link will expire in <b> 1 day </b>, so please use it as soon as possible.</p>
                    <div class="footer">
                        <p>Best regards</p>
                    </div>
                </div>
            </body>
            </html>
        `;
};
export default { passwordRecovery, activateAccount };
