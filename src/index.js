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
        'http://localhost:3001',
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3000'
    ]
}))

dotenv.config();

// const serviceAuth = require('./services/auth');
// serviceAuth.setupAuth(app);

// const session = require('express-session');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// var userProfile;
// dotenv.config();
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


    // app.set('view engine', 'ejs');

    // app.use(
    //     session({
    //         resave: false,
    //         saveUninitialized: true,
    //         secret: 'SECRET' 
    //     })
    // );

    // /*  PASSPORT SETUP  */
    // app.use(passport.initialize());
    // app.use(passport.session());

    // app.set('view engine', 'ejs');

    // passport.serializeUser(function(user, cb) {
    //     cb(null, user);
    // });

    // passport.deserializeUser(function(obj, cb) {
    //     cb(null, obj);
    // });

    // /*  Google AUTH  */
    // passport.use(
    //     new GoogleStrategy(
    //         {
    //             clientID: GOOGLE_CLIENT_ID,
    //             clientSecret: GOOGLE_CLIENT_SECRET,
    //             callbackURL: "http://localhost:3000/auth/google/callback"
    //         },
    //         function(accessToken, refreshToken, profile, done) {
    //             userProfile = profile;
    //             return done(null, userProfile);
    //         }
    //     )
    // );
    // app.get(
    //     '/auth/google/callback', 
    //     passport.authenticate('google', { failureRedirect: '/error' }),
    //     function(req, res) {
    //         // Successful authentication, redirect success.
    //         res.redirect('/success');
    //     }
    // );
    // app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    // app.get('/success', (req, res) => res.send(userProfile));
    // app.get('/error', (req, res) => res.send("Error logging in"));





// SESSION
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));    

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/auth/google/success', (req, res) => res.status(200).send(userProfile));
app.get('/auth/google/error', (req, res) => res.status(401).send("Error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '307003734230-a674ltn77dujprfqmdqd2r370nddmcll.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://product-manager-orcc.onrender.com/auth/google/callback"
    // callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/auth/google/success');
  });


const routerCategories = require('./routes/categories');
const routerAccounts = require('./routes/accounts');
const routerShops = require('./routes/shops');
const routerProducts = require('./routes/products');
const routerSliders = require('./routes/sliders');
const routerCarts = require('./routes/carts');



app.get('/', (req, res) => {
    res.send("Home");
});

app.use('/categories', routerCategories);
app.use('/accounts', routerAccounts);
app.use('/shops', routerShops);
app.use('/products', routerProducts);
app.use('/sliders', routerSliders);
app.use('/carts', routerCarts);


app.listen(port, () => {
    console.log("Listening on port " + port);
});