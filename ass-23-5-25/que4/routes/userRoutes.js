const express = require('express');
const router = express.Router();
const uc = require('../controllers/userController');

router.post("/", uc.createUser);
router.get("/", uc.getUsersByRole);

module.exports = router;
