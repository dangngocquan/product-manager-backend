const service = require('../services/accounts');

// [GET]
async function createNew(req, res, next) {
    try {
        await service.createNewAccount(req.body);
        res.ype('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": "Create new account successfully."
        }));
    } catch (err) {
        console.error("Error while creating new account. ",  err.message);
        res.ype('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Create new categories failed."
        }));
        next(err);
    }
} 


// [POST]




// [PATCH]





// [DELETE]




module.exports = {
    // [POST]
    createNew,
}