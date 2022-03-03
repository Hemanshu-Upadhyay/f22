require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const Bookingmail = (
  email,
  name,
  servicename,
  servicetime,
  companyname,
  servicetimestart,
  booking_id
) => {
  let mailOptions = {
    from: "UrbanServices@gmail.com",
    to: email,
    subject: "Boooking Confirmation",
    text: `Hello ${name},your booking for ${servicename} on ${servicetime} at ${companyname} at ${servicetimestart} has been confirmed.,
      find your booking id Below:,
        ${booking_id},
      Have Query??, feel free to connect with us at Urbanservicecustomerser@gmail.com
      Team UrbanServices`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log("error", err);
    console.log("Booking confirmation mail sent");
  });
};

module.exports = Bookingmail;
