
const auth = require('../services/auths');
const service = require('../services/accounts');


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


async function verifyEmail(req, res, next) {
    try {
        if (req.body.username === undefined || 
            req.body.email === undefined || 
            req.body.password === undefined || 
            req.body.nickname === undefined
            ) {
            res.type('json');
            res.status(400).send(JSON.stringify({
                "message": "Request can't be processed."
            }));
        } else {
            var ids = (await service.getIdByUsername(req.body.username)).ids;
            var idss = (await service.getIdByEmail(req.body.email)).ids;
            if (ids.length > 0 || idss.length > 0) {
                res.type('json');
                res.status(409).send(JSON.stringify({
                    "message": "Username or email already exists."
                }));
            } else {
                var result = await auth.verifyEmail(
                    req.body.email,
                    req.body.username,
                    req.body.password,
                    req.body.nickname
                );
                res.type('json');
                res.status(201).send(JSON.stringify({
                    "message": "Sent otp code to email successfully.",
                    "email": result
                }));
            }
        }
    } catch (err) {
        console.error("Error while verify email account. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Sent verify email account failed."
        }));
        next(err);
    }
} 


module.exports = {
    getGoogleProfile,
    verifyEmail
}