const dotenv = require('dotenv');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
// const { Auth, LoginCredentials } = require("two-step-auth");
const nodemailer = require('nodemailer');
const db = require('./db');


// Auth
async function generateAccessToken(payload) {
    dotenv.config();
    return jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        {
            expiresIn: '6h'
        }
    );
}

async function authenticateToken(token) {
    dotenv.config();
    return jwt.verify(
        token, 
        process.env.TOKEN_SECRET
    );
}

async function getGoogleProfileByIdToken(token) {
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client();
    async function verify() {
        dotenv.config();
        const ticket = await client.verifyIdToken({
            idToken: token,
            requiredAudience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        return payload;
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    return verify().catch(console.error);
}

async function verifyEmail(email, username, password, nickname) {
    dotenv.config();

    var otp = generateOtp() + "";

    var sql =   
        `insert into verify_email (
            email, username, 
            password, nickname, otp
        ) values (
            '${email}',
            '${username}',
            '${password}',
            '${nickname}',
            '${otp}'
        ) `
    console.log(sql);
    await db.query(sql);

    var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,			//email ID
                pass: process.env.MY_EMAIL_PASSWORD			//Password 
            }
        });

    
    var details = {
        from: process.env.MY_EMAIL, // sender address same as above
        to: email, 					// Receiver's email id
        subject: '[Product Manager Shop] - Verify your email', // Subject of the mail.
        text: "Your OTP code is " + otp					// Sending OTP 
    };

    await transporter.sendMail(details, function (error, data) {
        if (error) {
            console.log(error)
        } else {
            console.log(data);
        }
    });

    return email;
}

function generateOtp() {
    return 100000 + Math.floor(Math.random() * 900000);
}

async function authenticateOTP(email, otp) {
    var sql =   
        `SELECT * FROM verify_email ` +
        `WHERE email = '${email}' AND otp = '${otp}'`;
    
    var infors = await db.query(sql);
    return {
        infors
    }
}


module.exports = {
    generateAccessToken,
    authenticateToken,
    getGoogleProfileByIdToken,
    verifyEmail,
    authenticateOTP
};

