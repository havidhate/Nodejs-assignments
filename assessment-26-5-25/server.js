const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/students', studentRoutes);

// 404 Handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error Handler
app.use(errorHandler);

// DB Connect and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
