const auth = require('./auth');

async function isAdmin(token) {
    const decoded = await auth.authenticateToken(token);
    return (decoded && decoded.type == 'admin');
}

module.exports = {
    isAdmin,
}