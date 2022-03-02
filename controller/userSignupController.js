require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usermodel = require("../model/customerSchema");

const secret = process.env.SECRET;

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await Usermodel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User Does Not Exist Please Signup" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({message: "Sign-in Successful",result: oldUser, token});
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const oldUser = await Usermodel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Usermodel.create({
      email,
      password: hashedPassword,
      name: name,
      phone: phone,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token, message: "signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const getUsers = async (req, res) => {
    try {
        const Users = await Usermodel.find({})
        res.json(Users)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: " Server Error"})
    }
}
module.exports = {
  signup,
  signin,
  getUsers,
};
