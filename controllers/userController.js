const User = require("../models/user");


exports.signup = async (req, res, next) => {
  try {
    // It will handel the following data
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return next(new Error("Name, Email, and password is required"));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if the user is giving both
    if (!email || !password) {
      return next(new Error("Please provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");

    // check if user is in DB
    if (!user) {
      return next(new Error("This user is not in the DB kindely signup"));
    }

    const isPasswordCorrect = await user.isValidatedPassword(password);

    // check if password is correct
    if (!isPasswordCorrect) {
      return next(new Error("Password is incorrect"));
    }
    res.status(201).json({ message: "login successful!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
