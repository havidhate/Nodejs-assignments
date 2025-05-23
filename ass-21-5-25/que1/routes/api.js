const express = require('express');

module.exports = (limiter) => {
  const router = express.Router();

  // Public route (no rate limit)
  router.get('/public', (req, res) => {
    res.json({ message: "This is a public endpoint!" });
  });

  // Limited route
  router.get('/limited', limiter, (req, res) => {
    res.json({ message: "You have access to this limited endpoint!" });
  });

  return router;
};
