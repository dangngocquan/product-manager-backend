const service = require('../services/accounts');
const auth = require('../services/auth');
const serviceHistoryLogins = require('../services/historyLogins');

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

            // Save history login
            await serviceHistoryLogins.insertHistory(account.id);

            // Return response to client
            res.status(200).send(JSON.stringify({
                "message": "Login account successful.",
                "token": token
            }));
        } else {
            res.status(200).send(JSON.stringify({
                "message": "Username or password incorrect.",
                "token": null
            }));
        }
    } catch (err) {
        console.error("Error while login account. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Login account failed."
        }));
        next(err);
    }
}

async function loginAccountWithGoogle(req, res, next) {
    try {
        const accountInformations = (await service.loginAccountWithGoogle(req.body)).accountInformations;
        res.type('json');
        if (accountInformations.length > 0) {
            var [account, ] = accountInformations;
            const token = await auth.generateAccessToken(account);

            // Save history login
            await serviceHistoryLogins.insertHistory(account.id);

            // Return response to client
            res.status(200).send(JSON.stringify({
                "message": "Login account successful.",
                "token": token
            }));
        } else {
            res.status(200).send(JSON.stringify({
                "message": "Username or password incorrect.",
                "token": null
            }));
        }
    } catch (err) {
        console.error("Error while login account. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Login account failed."
        }));
        next(err);
    }
}



async function getInformationsByToken(req, res, next) {
    try {
        const clientInformations = await auth.authenticateToken(req.body.token);
        res.type('json');
        res.status(200).send(JSON.stringify({
            "message": "Get client informations successful.",
            "informations": clientInformations
        }));
    } catch (err) {
        console.error("Error while get client informations. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Get client informations failed."
        }));
        next(err);
    }
}




// [POST]
async function createNew(req, res, next) {
    try {
        if (req.body.username === undefined || 
            req.body.password === undefined || 
            req.body.nickname === undefined
            ) {
            res.type('json');
            res.status(400).send(JSON.stringify({
                "message": "Request can't be processed."
            }));
        } else {
            var ids = (await service.getIdByUsername(req.body.username)).ids;
            if (ids.length > 0) {
                res.type('json');
                res.status(409).send(JSON.stringify({
                    "message": "Username already exists."
                }));
            } else {
                const result = await service.createNewAccount(req.body);
                if (result) {
                    res.type('json');
                    res.status(201).send(JSON.stringify({
                        "message": "Create new account successfully."
                    }));
                } else {
                    res.type('json');
                    res.status(500).send(JSON.stringify({
                        "message": "Create new account failed."
                    }));
                }  
            }
        }
    } catch (err) {
        console.error("Error while creating new account. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Create new account failed."
        }));
        next(err);
    }
} 

async function createNewWithGoogle(req, res, next) {
    try {
        if (req.body.email === undefined || 
            req.body.nickname === undefined
            ) {
            res.type('json');
            res.status(400).send(JSON.stringify({
                "message": "Request can't be processed."
            }));
        } else {
            var ids = (await service.getIdByEmail(req.body.email)).ids;
            if (ids.length > 0) {
                res.type('json');
                res.status(409).send(JSON.stringify({
                    "message": "Email already used for another account."
                }));
            } else {
                const result = await service.createNewAccountWithGoogle(req.body);
                if (result) {
                    res.type('json');
                    res.status(201).send(JSON.stringify({
                        "message": "Create new account successfully."
                    }));
                } else {
                    res.type('json');
                    res.status(500).send(JSON.stringify({
                        "message": "Create new account failed."
                    }));
                }  
            }
        }
    } catch (err) {
        console.error("Error while creating new account. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
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
    loginAccountWithGoogle,
    getInformationsByToken,
    // [POST]
    createNew,
    createNewWithGoogle
}