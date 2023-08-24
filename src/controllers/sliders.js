
const serviceSliders = require('../services/sliders');
const role = require('../services/role');


// [GET]
async function getSliders(req, res, next) {
    try {
        var sliders = await serviceSliders.getSliders();
        res.type('json');
        res.status(200).send(JSON.stringify({
            "status": 1,
            "message": `Get sliders successfully.`,
            "sliders": sliders
        }));
    } catch (err) {
        console.error("Error while getting sliders. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "status": 0,
            "message": `Get sliders failed.`
        }));
        next(err);
    }
}



// [POST]
async function addNew(req, res, next) {
    try {
        res.type('json');
        if (await role.isAdmin(req.body.token)) {
            await serviceSliders.addSlider(req.body.image);
            res.status(200).send(JSON.stringify({
                "status": 1,
                "message": "Insert new slider successfully."
            }));
        } else {
            res.status(401).send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only admin can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while inserting new slider. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "status": 0,
            "message": "Insert new slider failed."
        }));
        next(err);
    }
} 


module.exports = {
    getSliders,
    addNew

}