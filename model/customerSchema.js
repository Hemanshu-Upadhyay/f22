const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  bookings: {
    type: Array,
    required: true,
  },
});

mongoose.model("users", UserSchema);
module.exports = mongoose.model("users");
