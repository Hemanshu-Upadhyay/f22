const express = require("express");
const router = express.Router();
const CompanyController = require("../controller/shopSignupContoller");
const auth = require("../Auth/AuthMiddleware");

router.get("/", (req, res) => {
  res.send({ message: "Company routes Working" });
});

router.post("/signup", CompanyController.CompanySignUp);
router.post("/signin", CompanyController.CompanySignIn);
router.get("/getCompanies", auth, CompanyController.getCompanies);
router.get("/getCompanyByName", auth, CompanyController.getCompanyByName);
router.get(
  "/getcompaniespriceHightoLow",
  auth,
  CompanyController.getcompaniespriceHightoLow
);
router.get(
  "/getcompaniespriceLowtoHigh",
  auth,
  CompanyController.getcompaniespriceLowtoHigh
);

module.exports = router;
