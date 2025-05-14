// index.js
const express = require("express");
const getFileInfo = require("./fileinfo");
const parseUrl = require("./urlparser");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/fileinfo", (req, res) => {
  const { filepath } = req.query;

  if (!filepath) {
    return res.status(400).json({ error: "filepath query parameter is required" });
  }

  const result = getFileInfo(filepath);
  res.json(result);
});

app.get("/parseurl", (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "url query parameter is required" });
  }

  const result = parseUrl(url);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
