// utils/sendOtp.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(toEmail, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Your OTP for Unofficial Notes',
    text: `Your OTP is: ${otp}. It expires in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendOtpEmail;
