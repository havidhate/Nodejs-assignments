const express = require("express");
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/vehicles", vehicleRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
