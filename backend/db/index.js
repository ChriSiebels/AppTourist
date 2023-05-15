// const mongoose = require("mongoose");

// const MONGO_URI =
//   process.env.MONGODB_URI || "mongodb://localhost/project-management-server";

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
//   autoReconnect: true,
//   reconnectTries: Number.MAX_VALUE,
//   reconnectInterval: 500, // Reconnect every 500ms
// };

// const connectWithRetry = () => {
//   console.log("MongoDB connection with retry");
//   mongoose
//     .connect(MONGO_URI, options)
//     .then(() => {
//       console.log("MongoDB is connected");
//     })
//     .catch((err) => {
//       console.log(
//         "MongoDB connection unsuccessful, retry after 5 seconds.",
//         err
//       );
//       setTimeout(connectWithRetry, 5000);
//     });
// };

// connectWithRetry();
