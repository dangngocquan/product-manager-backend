const express = require('express');
const router = express.Router();
const controller = require('../controllers/uploads');
const multer = require('multer');


// [GET]




// [POST]
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

router.post("/", upload.single("files"), controller.upload);




// [PATCH]






// [DELETE]




module.exports = router;