const jwt = require("jsonwebtoken");
const User = require("../models/User");

// create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    // Login user
    const user = await User.login(username, email, password)

    // Create a token for the user
    const token = createToken(user._id)

    // Return the email and token
    res.status(200).json({ username: user.username, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Signup user
    const user = await User.signup(username, email, password)

    // Create token
    const token = createToken(user._id)

    // Return email and token
    res.status(201).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signupUser, loginUser };