const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(authRoutes);

app.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Server running on port ${process.env.PORT}`);
});
