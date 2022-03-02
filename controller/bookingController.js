const bookingschema = require("../model/bookingSchema");
const UserSchema = require("../model/customerSchema");
const CompanySchema = require("../model/companySchema");

// for Getting all the bookings
const Getbookings = (req, res) => {
  bookingschema.find({}).then((data) => {
    if (!data) {
      res.status(404).json({ message: "No Bookings Found" });
    } else {
      res.json(data);
    }
  });
};

// For Creating the booking
const CreateBooking = (req, res) => {
  const {
      customer_name,
      customer_email,
      customer_phone,
      company_name,
      company_email,
      service_name,
      service_price,
      service_time,
      service_date,
      service_time_start,
      company_address,
    } = req.body,
    newBooking = new bookingschema({
      customer_name,
      customer_email,
      customer_phone,
      company_name,
      company_email,
      service_name,
      service_price,
      service_time,
      service_date,
      service_time_start,
      company_address,
    });

  newBooking
    .save()
    .then((data) => {
      res.json(data);
      UserSchema.findOne({ customer_email: customer_email }).then((user) => {
        if (user) {
          user.bookings.push(newBooking);
          user.save();
        }
      });
      CompanySchema.findOne({ company_email: company_email }).then(
        (company) => {
          if (company) {
            company.current_bookings.push(newBooking);
            company.save();
          }
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
};

// For Cancelling the Booking
const CancelBooking = (req, res) => {
  const { booking_id } = req.body,
    booking = bookingschema.findByIdAndDelete(booking_id);

  booking.then((data) => {
    if (!data) {
      res.status(404).json({ message: "Booking Not Found" });
    } else {
      res.json(data);
      Userschema.findByIdAndDelete(data.customer_id).then((user) => {
        if (user) {
          user.bookings.pull(data);
          user.save();
        }
      });
      CompanySchema.findByIdAndDelete(data.company_id).then((company) => {
        if (company) {
          company.current_bookings.pull(data);
          company.save();
        }
      });
    }
  });
};

// get booking for specific date
const GetBookingByDate = (req, res) => {
  const { date } = req.body;
  bookingschema.find({ service_date: date }).then((data) => {
    if (!data) {
      res.status(404).json({ message: "No Bookings Found" });
    } else {
      res.json(data);
    }
  });
};

module.exports = {
  Getbookings,
  CreateBooking,
  CancelBooking,
  GetBookingByDate,
};
