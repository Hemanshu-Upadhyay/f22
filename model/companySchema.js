const mongoose = require("mongoose");
const random = Math.random().toString(36).substring(7);

let companySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_email: {
    type: String,
    required: true,
    default: `${random}@gmail.com`,
  },
  company_password: {
    type: String,
    required: true,
  },
  company_phone: {
    type: Number,
    required: true,
  },
  company_address: {
    type: String,
    required: true,
  },
  company_work_schedule: {
    type: String,
    required: true,
  },
  available_services: {
    type: Array,
    required: true,
  },
  available_seats: {
    type: Number,
    required: true,
    default: 10,
  },
  current_bookings: {
    type: Array,
    required: true,
  },
  company_starting_price: {
    type: Number,
    required: true,
  },
});

mongoose.model("company", companySchema);
module.exports = mongoose.model("company");
