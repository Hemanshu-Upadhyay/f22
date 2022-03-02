const express = require("express");
const router = express.Router();
const BookingController = require("../controller/bookingController");
const auth = require("../Auth/AuthMiddleware");

router.use("/", (req, res) => {
  res.send({ message: "Booking routes Working" });
});

router.use("./getbookings", auth, BookingController.Getbookings);
router.use("./createbooking", auth, BookingController.CreateBooking);
router.use("./cancelbooking", auth, BookingController.CancelBooking);
router.use("./getbookingbydate", auth, BookingController.GetBookingByDate);

module.exports = router;
