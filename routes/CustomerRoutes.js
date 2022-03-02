const express = require("express");
const router = express.Router();
const Usercontroller = require("../controller/userSignupController");
const auth = require("../Auth/AuthMiddleware");

router.get("/", (req, res) => {
  res.send({ message: "Customer routes Working" });
});

router.post("/signup", Usercontroller.signup);
router.post("/signin", Usercontroller.signin);
router.get("/getUsers", auth, Usercontroller.getUsers);

module.exports = router;
