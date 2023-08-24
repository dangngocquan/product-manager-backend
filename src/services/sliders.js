const db = require('./db');

// [GET]
async function getSliders() {
    var sql =   
        `SELECT * FROM sliders `;
    
    var sliders = await db.query(sql);
    return {
        sliders
    }
}

// [POST]
async function addSlider(image) {
    var sql =   
        `INSERT INTO sliders (image) VALUES (\'${image}\')`;
   
    await db.query(sql);
}


module.exports = {
    getSliders,
    addSlider
}