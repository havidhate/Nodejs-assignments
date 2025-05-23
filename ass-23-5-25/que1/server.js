const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/userDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Connection Error", err));

app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
