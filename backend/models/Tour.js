const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stops: {
    type: [
      {
        type: {
          longitude: {
            type: Number,
            required: true,
          },
          latitude: {
            type: Number,
            required: true,
          },
        },
      },
    ],
    required: true,
  },
});

const Tour = mongoose.model("Tour", TourSchema);
module.exports = Tour;
