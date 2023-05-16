const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tours: {
    type: [
      {
        type: Types.ObjectId,
        ref: "Tour",
      },
    ],
    required: true,
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
