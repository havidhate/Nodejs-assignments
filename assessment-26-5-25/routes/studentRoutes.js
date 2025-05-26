const express = require('express');
const { body } = require('express-validator');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getAnalytics
} = require('../controllers/studentController');

const router = express.Router();

router.post(
  '/',
  [
    body('name').isString().isLength({ min: 3 }),
    body('age').isInt({ min: 10, max: 20 }),
    body('grade').isIn(['9th', '10th', '11th', '12th']),
    body('section').isIn(['A', 'B', 'C', 'D']),
    body('score').isFloat({ min: 0, max: 100 })
  ],
  createStudent
);

router.get('/', getAllStudents);
router.get('/analytics', getAnalytics);
router.get('/:id', getStudentById);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
