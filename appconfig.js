const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

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

// CONNECT TO THE DATABASE
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true,
}).then(_=>{console.log("Connexion a la base de donne reussite ")}).catch(error => {throw new Error("Une Erreur c'est produite lors de la connexion a la base de donnee");});

module.exports = {
    appConfig, appConfigMiddleware, 
    storageArticleImage, storageUserImage
}