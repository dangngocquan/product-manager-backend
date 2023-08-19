const service = require('auth.js');

async function authenticateToken(req, res, next) {
    try {
        const decoded = await service.authenticateToken(req.body.token);
        res.type('json');
        res.send(JSON.stringify({   
            "status": 1,
            "message": `Authentication successful`
        }));
        return decoded.username;
    } catch (err) {
        console.log("Error while authenticating token" + err.message);
        res.type('json');
        res.send(JSON.stringify({   
            "status": 0,
            "message": `Authentication failed.`
        }));
    }
}

module.exports = {
    authenticateToken
};