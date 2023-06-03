require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
  }
});

userSchema.statics.signup = async function(email, password) {

  // Check if email and password are present
  if (!email || !password) {
    throw Error("All fields required");
  }

  // Check if user already exists in database
  const exists = await this.exists({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  // Check for valid email
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  // Check for strong password
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Hash password
  const saltValue = parseInt(process.env.SALT);
  const salt = await bcrypt.genSalt(saltValue);
  const hash = await bcrypt.hash(password, salt);

  // Create user
  const user = await this.create({ email, password: hash });

  return user;
}

userSchema.statics.login = async function(email, password) {

  // Check if email and password are present
  if (!email || !password) {
    throw Error("All fields required");
  }

  // Grab user from database
  const user = await this.findOne({ email })

  // If no user found in database throw error
  if (!user) {
    throw Error(`User with email: ${email} does not exists, please signup before logging in`)
  }

  // Check password matches
  const passwordMatch = await bcrypt.compare(password, user.password)

  // If password does not match, throw error
  if (!passwordMatch) {
    throw Error('Invalid login credentials')
  }

  return user
}

module.exports = mongoose.model("User", userSchema);