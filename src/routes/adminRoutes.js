const express = require('express');
const { getAllUsers } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);

module.exports = router;
