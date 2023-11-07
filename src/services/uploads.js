const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "ddgatus4k",
    api_key: "636669716254181",
    api_secret: "HcTeTEQOWwUB4dWcaZH48wZg_sU"
});
  
async function upload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}

module.exports = {
    upload
}