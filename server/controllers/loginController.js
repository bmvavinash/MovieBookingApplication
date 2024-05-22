const users = require('../data/users');

const loginUser = (req, res) => {
    const { username } = req.body;
    if (!users[username]) {
        users[username] = { bookings: {} };
    }
    res.json({ success: true });
};

module.exports = { loginUser };
