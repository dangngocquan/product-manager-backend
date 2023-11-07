const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

const routerCategories = require('./routes/categories');
const routerAccounts = require('./routes/accounts');
const routerShops = require('./routes/shops');
const routerProducts = require('./routes/products');
const routerSliders = require('./routes/sliders');
const routerCarts = require('./routes/carts');
const routerAuths = require('./routes/auths');
const routerUploads = require('./routes/uploads');

// // Upload localhost
// const imageUploadPath = 'D:/Study/NodeJS';

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, imageUploadPath)
//   },
//   filename: function(req, file, cb) {
//     cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
//   }
// })

// const imageUpload = multer({storage: storage})

// app.post('/uploads', imageUpload.array("files", 1), (req, res) => {
//   console.log('POST request received to /image-upload.');
//   console.log('Axios POST body: ', req.body);
//   res.send('POST request recieved on server to /image-upload.');
// })


// routes
app.get('/', (req, res) => {
    res.send("Home");
});

app.use('/categories', routerCategories);
app.use('/accounts', routerAccounts);
app.use('/shops', routerShops);
app.use('/products', routerProducts);
app.use('/sliders', routerSliders);
app.use('/carts', routerCarts);
app.use('/auths', routerAuths);
app.use('/uploads', routerUploads);


app.listen(port, () => {
    console.log("Listening on port " + port);
});