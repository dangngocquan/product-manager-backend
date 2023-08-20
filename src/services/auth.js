const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

async function generateAccessToken(payload) {
    return jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        {
            expiresIn: '6h'
        }
    );
}

async function authenticateToken(token) {
    return jwt.verify(
        token, 
        process.env.TOKEN_SECRET
    );
}

module.exports = {
    generateAccessToken,
    authenticateToken
};