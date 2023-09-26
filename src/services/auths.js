const dotenv = require('dotenv');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');


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
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '307003734230-a674ltn77dujprfqmdqd2r370nddmcll.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
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


module.exports = {
    generateAccessToken,
    authenticateToken,
    getGoogleProfileByIdToken
};

