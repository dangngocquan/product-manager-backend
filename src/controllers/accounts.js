const service = require('../services/accounts');
const serviceClients = require('../services/clients');

// [GET]


// [POST]
async function createNew(req, res, next) {
    try {
        var formData1 = {
            "username": req.body.username,
            "password": req.body.password
        };
        var [{id}, ] = await service.createNewAccount(formData1);

        var formData2 = {
            "account_id": id,
            "nickname": req.body.nickname,
            "email": req.body.email,
            "phone_number": req.body.phone_number,
            "gender": req.body.gender,
            "birthday": req.body.birthday,
            "portrait": req.body.portrait
        }
        await serviceClients.createNewClient(formData2);
        
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
            "message": "Create new categories failed."
        }));
        next(err);
    }
} 



// [PATCH]





// [DELETE]




module.exports = {
    // [POST]
    createNew,
}