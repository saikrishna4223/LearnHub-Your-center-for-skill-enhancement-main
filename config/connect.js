const mongoose = require("mongoose");

// ✅ UPDATED VERSION (uses correct env var: MONGO_URI)
const connectionOfDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: 'video-course-application', // optional if DB name is in URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};

module.exports = connectionOfDb;


/*
// ❌ OLD VERSION (uses incorrect env var name)
const connectionOfDb = () => {
  mongoose
    .connect(process.env.MONGO_DB, {
      dbName: 'video-course-application',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};
*/
