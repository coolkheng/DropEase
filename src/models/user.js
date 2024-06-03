const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  role: {
    type: String,
    required: [true, "Your role is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  store: {
    type: String,
  },
  phoneno: {
    type: String,
  },
  logo: {
    type: String,
  },
  category: {
    type: String,
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
 module.exports = mongoose.model("User", userSchema);