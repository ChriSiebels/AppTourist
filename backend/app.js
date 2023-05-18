require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const FRONTEND_URL = process.env.ORIGIN;

app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);
// app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const toursRouter = require("./routes/tours.routes");
app.use("/tours", toursRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
