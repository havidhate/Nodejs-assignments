const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.filterCourses = async (req, res) => {
  try {
    const filter = {};
    if (req.query.title) filter.title = req.query.title;
    if (req.query.instructor) filter.instructor = req.query.instructor;

    const courses = await Course.find(filter).select("title instructor schedule");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
