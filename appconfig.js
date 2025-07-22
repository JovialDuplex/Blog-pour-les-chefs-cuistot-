const path = require("path");
const multer = require("multer");

function appConfig(app) {
    app.set("views", path.join(__dirname, "views")); // define my views folder
    app.set("view engine", "ejs"); // define the view engine of my app
    app.set("appName", "blog"); // define the name of my application
}

function appConfigMiddleware(app , express) {
    app.use(express.static(path.join(__dirname, "public"))); // define static folder of my app 
    
}

const storageArticleImage = multer.diskStorage({
    filename: (request, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    },

    destination : (request, file, callback) =>{
        callback(null, path.join(__dirname, "public", "upload", "articles"));
    },
});

const storageUserImage = multer.diskStorage({
    filename: (request, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    },

    destination : (request, file, callback) =>{
        callback(null, path.join(__dirname, "public", "upload", "users"));
    },
});

module.exports = {
    appConfig, appConfigMiddleware, 
    storageArticleImage, storageUserImage
}