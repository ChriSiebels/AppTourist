const express = require("express");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Tour = require("../models/Tour.js");
const User = require("../models/User.js");

const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
  const { name, description, stops } = req.body;

  if (!name || !description || !stops) {
    res
      .status(400)
      .json({ message: "Please provide name, description and stops" });
    return;
  }

  const tour = await Tour.create({
    name,
    description,
    stops,
  });
  const { _id } = req.payload;

  await User.updateOne({ _id }, { $push: { tours: tour } });
  res.status(201).json({
    tour: {
      name: tour.name,
      description: tour.description,
      stops: tour.stops,
    },
  });
});

router.get("/", isAuthenticated, async (req, res) => {
  const { _id } = req.payload;
  const { tours } = await User.findById(_id).populate("tours");
  res.status(200).json(tours);
});

module.exports = router;
