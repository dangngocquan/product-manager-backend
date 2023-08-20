const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const cors = require('cors');
app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ]
}))

dotenv.config();


const routerCategories = require('./routes/categories');
const routerAccounts = require('./routes/accounts');


app.get('/', (req, res) => {
    res.send("Home");
});

app.use('/categories', routerCategories);
app.use('/accounts', routerAccounts);


app.listen(port, () => {
    console.log("Listening on port " + port);
});