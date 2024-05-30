const User = require("../models/user");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

const validatePassword = (password) => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSymbols
  );
};

module.exports.Signup = async (req, res, next) => {
  try {
    console.log("Signup request received:", req.body); // Debugging line
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists"); // Debugging line
      return res.status(400).json({ 
        message: "User already exists", 
        success: false });
    }

    if (!validatePassword(password)) {
      console.log("Invalid password"); // Debugging line
      return res.status(400).json({
        message: "Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and symbols.",
        success: false,
      });
    }

    const user = await User.create({ email, password, role });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    console.log("Login request received:", req.body); // Debugging line
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("All fields are required"); // Debugging line
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Email not registered"); // Debugging line
      return res.status(401).json({ message: "Email not registered", success: false });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      console.log("Incorrect password"); // Debugging line
      return res.status(401).json({ message: "Incorrect password", success: false });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      role: user.role, 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
