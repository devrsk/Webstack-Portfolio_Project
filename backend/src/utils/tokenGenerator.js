const jwt = require('jsonwebtoken');
const { JWT } = require('../constants');

function tokenGenerator(user_id) {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, JWT.JWT_SECRET, { expiresIn: '1hr' });
}

module.exports = tokenGenerator;
