require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const CustomerRoutes = require("./routes/CustomerRoutes");
const CompanyRoutes = require("./routes/CompanyRoutes");
const BookingRoutes = require("./routes/BookingRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/Customer", CustomerRoutes);
app.use("/Company", CompanyRoutes);
app.use("/Booking", BookingRoutes);
app.use("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to The Database");
    app.listen(port, () => {
      console.log(`Server Started On: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
