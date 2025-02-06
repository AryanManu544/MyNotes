const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
var fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "Splendid_Ganesha"

//Route 1: Create a user using POST "/api/auth", doesn't require login
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password,salt)
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user:{
        id: user.id 
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    //res.json(user)
    res.json({authtoken});
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' })
  }
});
//Route 2: Authenticate a user using Post "api/auth/login". No login required
router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false
  console.log("Request received:", req.body); // Log incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array()); // Log validation errors
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      success = false 
      console.log(`User with email ${email} not found`); // Log missing user
      return res.status(400).json({success, error: "Sorry, the user doesn't exist" });
    }

    // Compare passwords
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      success = false 
      console.log("Password mismatch for user:", email); // Log password mismatch
      return res.status(400).json({ success, error: "Password is incorrect" });
    }

    // Generate JWT
    const data = {
      user: {
        id: user.id
      }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log("Login successful, token generated"); // Log success
    success = true 
    res.json({success, authtoken });
  } catch (error) {
    console.error("Error during login:", error); // Log unexpected errors
    res.status(500).send("Internal server error");
  }
});

//Route 3: Get used loggedin with user details using: POST api/auth/getuser. Login required
router.post('/getuser',fetchuser, async (req, res) => {

  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})
module.exports = router;