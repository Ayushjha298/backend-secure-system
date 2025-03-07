const User = require('../models/User');
const logToFile = require('../utils/logger'); 

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        
        logToFile(`fetch users : Retrieved ${users.length} users`);
        
        res.json(users);
    } catch (error) {
        logToFile(`error in fetch users: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllUsers };
