const JWT = require('jsonwebtoken');

const jwtGenerator = ( user ) => {

    // Data integer
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const token = JWT.sign(payload, 
                        '4UT0SC-V1',
                        { expiresIn: '1h' });

    return token;
}

module.exports = { jwtGenerator };