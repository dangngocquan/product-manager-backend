const express = require('express');
const app = express();
const port = 3000;

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


const routerCategories = require('./routes/categories');


app.get('/', (req, res) => {
    res.send("Home");
});

app.use('/categories', routerCategories);


app.listen(port, () => {
    console.log("Listening on port " + port);
});