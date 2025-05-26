const Student = require('../models/Student');
const { validationResult } = require('express-validator');

// Create
exports.createStudent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

// Get All
exports.getAllStudents = async (req, res, next) => {
  try {
    const { grade, section, sort, search, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (grade) filter.grade = grade;
    if (section) filter.section = section;
    if (search) filter.name = { $regex: search, $options: 'i' };

    let sortOption = {};
    if (sort === 'score') sortOption.score = -1;
    else if (sort === 'name') sortOption.name = 1;

    const students = await Student.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(students);
  } catch (err) {
    next(err);
  }
};

// Get One
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    next(err);
  }
};

// Analytics
exports.getAnalytics = async (req, res, next) => {
  try {
    const stats = await Student.aggregate([
      {
        $facet: {
          averageScore: [{ $group: { _id: null, avg: { $avg: '$score' } } }],
          topPerformers: [
            { $sort: { score: -1 } },
            { $limit: 3 },
            { $project: { name: 1, score: 1, _id: 0 } }
          ],
          studentsByGrade: [
            { $group: { _id: '$grade', count: { $sum: 1 } } },
            { $project: { grade: '$_id', count: 1, _id: 0 } }
          ]
        }
      }
    ]);

    const result = {
      averageScore: stats[0].averageScore[0]?.avg || 0,
      topPerformers: stats[0].topPerformers,
      studentsByGrade: stats[0].studentsByGrade.reduce((acc, cur) => {
        acc[cur.grade] = cur.count;
        return acc;
      }, {})
    };

    res.json(result);
  } catch (err) {
    next(err);
  }
};
