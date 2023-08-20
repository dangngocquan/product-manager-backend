const service = require('../services/accounts');
const auth = require('../services/auth');

// [GET]
async function checkExistUsername(req, res, next) {
    try {
        var ids = (await service.getIdByUsername(req.query.username)).ids;
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": "Check username account successfully.",
            "isExisted": (ids.length > 0)? 1 : 0
        }));
        
    } catch (err) {
        console.error("Error while checking username account. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Check username account failed."
        }));
        next(err);
    }
}


async function loginAccount(req, res, next) {
    try {
        const accountInformations = (await service.loginAccount(req.body)).accountInformations;
        res.type('json');
        if (accountInformations.length > 0) {
            var [account, ] = accountInformations;
            const token = await auth.generateAccessToken(account);
            res.send(JSON.stringify({
                "status": 1,
                "message": "Login account successful.",
                "token": token
            }));
        } else {
            res.send(JSON.stringify({
                "status": 0,
                "message": "Username or password incorrect.",
            }));
        }
    } catch (err) {
        console.error("Error while login account. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Login account failed."
        }));
        next(err);
    }
}


// [POST]
async function createNew(req, res, next) {
    try {
        await service.createNewAccount(req.body);
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": "Create new account successfully."
        }));
    } catch (err) {
        console.error("Error while creating new account. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Create new account failed."
        }));
        next(err);
    }
} 



// [PATCH]





// [DELETE]




module.exports = {
    // [GET]
    checkExistUsername,
    loginAccount,
    // [POST]
    createNew,
}