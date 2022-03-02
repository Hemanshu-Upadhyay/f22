require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CompanySchema = require("../model/companySchema");

const secret = process.env.SECRET ;

const CompanySignIn = async (req, res) => {
  const { company_email, company_password } = req.body;

  try {
    const oldUser = await CompanySchema.findOne({ company_email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      company_password,
      oldUser.company_password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { company_email: oldUser.company_email, id: oldUser._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const CompanySignUp = async (req, res) => {
  const {
    company_email,
    company_password,
    company_name,
    company_phone,
    company_address,
    company_work_schedule,
    available_services,
    available_seats,
  } = req.body;

  try {
    const oldUser = await CompanySchema.findOne({ company_email });

    if (oldUser)
      return res.status(400).json({ message: "Company already exists" });

    const hashedPassword = await bcrypt.hash(company_password, 12);

    const result = await CompanySchema.create({
      company_email,
      password: hashedPassword,
      company_name: company_name,
      company_phone: company_phone,
      company_address: company_address,
      company_work_schedule: company_work_schedule,
      available_services: available_services,
      available_seats: available_seats,
    });

    const token = jwt.sign(
      { company_email: result.company_email, id: result._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const getCompanies = async (req, res) => {
    try {
        const Companies = await CompanySchema.find({})
        res.json(Companies)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: " Server Error"})
    }
}

module.exports = {
  CompanySignUp,
  CompanySignIn,
  getCompanies,
};
