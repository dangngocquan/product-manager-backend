const service = require('../services/uploads');

async function upload(req, res) {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await service.upload(dataURI);
        res.status(200).json(cldRes);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        });
    }
}

module.exports = {
    upload
}