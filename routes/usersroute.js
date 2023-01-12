const express = require("express");
const router = express.Router();
const User = require("../models/User");

// login route
router.post("/login", async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      res.send(result);
    } else {
      res.status(500).json("Error");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// signup route

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User Registration Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
