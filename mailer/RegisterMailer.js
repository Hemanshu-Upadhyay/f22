require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const RegisterMail = (email,name ) => {
    let mailOptions = {
      from: "UrbanServices@gmail.com",
      to: email,
      subject: "Welcome To Urban Services",
      text: `
      Hello ${name}, Welcome to UrbanServices We are happy to see you on board.. 
      After your Verification is done you'll be able to use our services.
      if you are facing Any Issue While Login Please feel free to connect with us at Urbanservicecustomerser@gmail.com
      Team UrbanServices
      `,
  
    };
  
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) console.log("error", err);
      console.log("Register Mail Sent!");
    });
  };

module.exports = RegisterMail;