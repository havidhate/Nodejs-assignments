const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(express.json());
connectDB();

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

app.use("*", (req, res) => res.status(404).json({ error: "404 Not Found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
