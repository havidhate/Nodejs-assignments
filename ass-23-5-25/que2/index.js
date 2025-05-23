const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/users", userRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/UserProfilesDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error", err));

app.use("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
