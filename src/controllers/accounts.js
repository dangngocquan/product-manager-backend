
const service = require('../services/accounts');
const auth = require('../services/auths');
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
        const googleProfile = await auth.getGoogleProfileByIdToken(req.body.token);
        var accountInformations = (await service.loginAccountWithGoogle(googleProfile)).accountInformations;
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
            const result = await service.createNewAccountWithGoogle({
                "email": googleProfile.email,
                "nickname": googleProfile.name
            });
            if (result) {
                accountInformations = (await service.loginAccountWithGoogle(googleProfile)).accountInformations;
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
                res.type('json');
                res.status(500).send(JSON.stringify({
                    "message": "Login account failed."
                }));
            }  
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
        if (
            req.body.email === undefined || 
            req.body.otp === undefined
        ) {
            res.type('json');
            res.status(400).send(JSON.stringify({
                "message": "Request can't be processed."
            }));
        } else {
            const infors = (await auth.authenticateOTP(req.body.email, req.body.otp)).infors;
            if (infors.length > 0) {
                var data = infors[0];
                var formdata = {
                    "email" : data.email,
                    "username": data.username,
                    "password": data.password,
                    "nickname": data.nickname
                }
                const result = await service.createNewAccount(formdata);
                if (result) {
                    res.type('json');
                    res.status(201).send(JSON.stringify({
                        "message": "Verify email successfully."
                    }));
                } else {
                    res.type('json');
                    res.status(500).send(JSON.stringify({
                        "message": "Verify email failed."
                    }));
                }
            } else {
                res.status(409).send(JSON.stringify({
                    "message": "Verify email failed."
                }));
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
        if (req.body.token === undefined
            ) {
            res.type('json');
            res.status(400).send(JSON.stringify({
                "message": "Request can't be processed."
            }));
        } else {
            const googleProfile = await auth.getGoogleProfileByIdToken(req.body.token);
            var ids = (await service.getIdByEmail(googleProfile.email)).ids;
            if (ids.length > 0) {
                res.type('json');
                res.status(201).send(JSON.stringify({
                    "message": "Email already used for another account."
                }));
            } else {
                const result = await service.createNewAccountWithGoogle({
                    "email": googleProfile.email,
                    "nickname": googleProfile.name
                });
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


async function updatePortraitAccount(req, res, next) {
    try {
        const clientInformations = await auth.authenticateToken(req.body.token);
        console.log(clientInformations);
        await service.updatePortraitAccount(clientInformations.id, req.body.image);
        res.type('json');
        res.status(200).send(JSON.stringify({
            "message": "Update avatar successful.",
        }));
    } catch (err) {
        console.error("Error while update avatar client. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Update avatar failed."
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
    createNewWithGoogle,
    updatePortraitAccount
}