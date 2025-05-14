// index.js
const express = require("express");
const eventEmitter = require("./eventLogger");
const delayMessage = require("./delay");

const app = express();
const PORT = 3000;

// Test Route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// /emit route
app.get("/emit", (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Message query parameter is required." });
  }

  eventEmitter.emit("log", message);

  return res.json({
    status: "Event logged",
    timestamp: new Date().toISOString(),
  });
});

// /delay route
app.get("/delay", async (req, res) => {
  const { message, time } = req.query;

  if (!message || !time) {
    return res.status(400).json({ error: "Message and time query parameters are required." });
  }

  const delayMs = parseInt(time);
  if (isNaN(delayMs)) {
    return res.status(400).json({ error: "Time must be a valid number in milliseconds." });
  }

  const delayedMessage = await delayMessage(message, delayMs);

  res.json({
    message: delayedMessage,
    delay: `${delayMs}ms`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
