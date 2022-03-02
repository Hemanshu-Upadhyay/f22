const mongoose = require("mongoose");

let BookingSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  customer_phone: { type: Number, required: true },
  company_name: { type: String, required: true },
  company_email: { type: String, required: true },
  company_phone: { type: Number, required: true },
  service_name: { type: String, required: true },
  service_price: { type: Number, required: true },
  service_time: { type: Number, required: true },
  service_date: { type: Date, required: true },
  service_time_start: { type: String, required: true },
  company_address: { type: String, required: true },
});

mongoose.model("booking", BookingSchema);
module.exports = mongoose.model("booking");
