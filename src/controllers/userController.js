const User = require('../models/User');
const logToFile = require('../utils/logger'); 

const getUserProfile = async (req, res) => {
    try {
        logToFile(`user request for profile: User ID - ${req.user.id}`);

        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            logToFile(`error in getting user profile: User ID ${req.user.id} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        logToFile(`user profile fetched successfully: User ID - ${req.user.id}`);
        res.json(user);
    } catch (error) {
        logToFile(`error in getting user profile: ${error.message}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getUserProfile };
