const User = require("../models/userModel");
const { sendResponse } = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // email and pass not empty
    if (!email || !password) {
      return res
        .status(400)
        .send(sendResponse(null, true, "email or password not empty"));
    }
    // pass not less than 6 char
    if (password.length < 6) {
      return res
        .status(400)
        .send(
          sendResponse(null, true, "Password must be at least 6 characters"),
        );
    }
    // user exits check
    const user_list = await User.findOne({ email });
    if (user_list) {
      return res
        .status(400)
        .send(sendResponse(null, true, "Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const creatUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .send(sendResponse(creatUser, false, "User Inserted"));
  } catch (err) {
    return res
      .status(500)
      .send(sendResponse(null, true, `Server err:${err.message}`));
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user_list;
  try {
    // user exits check
    user_list = await User.findOne({ email });
    if (!user_list) {
      return res.status(400).send(sendResponse(null, true, "Email not exists"));
    }

    const isValidpass = await bcrypt.compare(password, user_list.password);

    if (!isValidpass) {
      return res
        .status(400)
        .send(sendResponse(null, true, "Password is Invalid"));
    }

    // token craete
    const token = jwt.sign(
      {
        _id: user_list._id,
        email: user_list.email,
        name: user_list.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).send(sendResponse(token, false, "login done "));
  } catch (err) {
    return res
      .status(500)
      .send(sendResponse(null, true, `Server err:${err.message}`));
  }
};
