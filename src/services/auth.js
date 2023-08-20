const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

async function generateAccessToken(payload) {
    dotenv.config();
    return jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        {
            expiresIn: '6h'
        }
    );
}

async function authenticateToken(token) {
    dotenv.config();
    return jwt.verify(
        token, 
        process.env.TOKEN_SECRET
    );
}

module.exports = {
    generateAccessToken,
    authenticateToken
};

