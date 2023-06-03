const express = require("express");

// User controller functions
const { loginUser, signupUser } = require("../controllers/users");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
