const express = require('express');
const router = express.Router();
const {
  createUser,
  addAddress,
  getUserSummary,
  getUserDetails,
  deleteAddress
} = require('../controllers/user.controller');

router.post('/', createUser);
router.post('/:userId/address', addAddress);
router.get('/summary', getUserSummary);
router.get('/:userId', getUserDetails);
router.delete('/:userId/address/:index', deleteAddress); // Bonus

module.exports = router;
