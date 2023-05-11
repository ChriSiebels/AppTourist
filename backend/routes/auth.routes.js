const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const router = express.Router();
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email adress." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message: `
      
            ....................../´¯/) 
            ....................,/¯../ 
            .................../..../ 
            ............./´¯/'...'/´¯¯\`·¸ 
            ........../'/.../..../......./¨¯\ 
            ........('(...´...´.... ¯~/'...') 
            ..........................'...../ 
            ..........''............. _.·´ 
            ..........................( 
            ..............................
      `,
    });
    return;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const {
    email: newEmail,
    name: newName,
    _id,
  } = await User.create({ email, password: hashedPassword, name });

  res.status(201).json({ user: { _id, email: newEmail, name: newName } });
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "User not found." });
    return;
  }

  // Compare the provided password with the one saved in the database
  const passwordCorrect = bcrypt.compareSync(password, user.password);

  if (!passwordCorrect) {
    res.status(401).json({ message: "Unable to authenticate the user" });
    return;
  }

  // Deconstruct the user object to omit the password
  const { _id, name } = user;

  // Create an object that will be set as the token payload
  const payload = { _id, email, name };

  // Create and sign the token
  const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "6h",
  });

  // Send the token as the response
  res.status(200).json({ authToken: authToken });
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, async (req, res) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
