const express = require('express');
const router = express.Router();
const cc = require('../controllers/courseController');

router.post("/", cc.createCourse);
router.get("/", cc.filterCourses);

module.exports = router;
