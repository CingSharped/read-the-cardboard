require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
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

userSchema.statics.signup = async function(username, email, password) {

  // Check if email and password are present
  if (!username || !email || !password) {
    throw Error("All fields required");
  }

  // Check if user or email already exists in database
  const emailExists = await this.exists({ email });
  const usernameExists = await this.exists({ username })

  if (emailExists) {
    throw Error("Email already in use, have you forgotten youre password?");
  }

  if (usernameExists) {
    throw Error('Sorry this username is already taken')
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
  const user = await this.create({ username, email, password: hash });

  return user;
}

userSchema.statics.login = async function(username, email, password) {

  // Check if email or username are present
  if (!email && !username) {
    throw Error("Email or username required");
  }

  let user
  // If email grab user from database using email
  if (email) {
    user = await this.findOne({ email });
  }

  // if no user found with email and has username grab user from database with username
  if (!user && username) {
    user = await this.findOne({ username });
  }

  // If no user found in database and used username throw error
  if (!user && username) {
    throw Error(`User ${username} does not exist`)
  }

  // If no user found and no username provided throw error
  if (!user && email) {
    throw Error('User with this email does not exist')
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