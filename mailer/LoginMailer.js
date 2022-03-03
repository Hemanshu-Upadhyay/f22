require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const LoginMail = (email) => {
    let mailOptions = {
      from: "UrbanServices@gmail.com",
      to: email,
      subject: "Login Notification",
      text: `We have noticed a login from your account on UrbanServices.com, if you did not do this, please contact us immediately.
      Thank you,
      Team UrbanServices`,
      
    };
  
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) console.log("error", err);
      console.log("Login Notification Mail Sent!");
    });
  };

module.exports = LoginMail;
  