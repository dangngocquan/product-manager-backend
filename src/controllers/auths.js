
const auth = require('../services/auths');


// [GET]



// [POST]
async function getGoogleProfile(req, res, next) {
    try {
        const profile = (await auth.authenticateGoogleToken(req.body.token));
        res.type('json');
        res.status(200).send(JSON.stringify({
            "message": "Get google profile successful.",
            "profile": profile
        }));
    } catch (err) {
        console.error("Error while get google profile. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Get google profile failed."
        }));
        next(err);
    }
} 


module.exports = {
    getGoogleProfile
}