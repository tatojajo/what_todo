const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    newUser = await newUser.save();
    if (!newUser) {
      return res.status(500).send("User cannot be created");
    }
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.JWT_KEY;

    if (!user) {
      return res.status(404).send("User not found");
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (user && validatePassword) {
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        secret,
        { expiresIn: "1d" }
      );

      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
