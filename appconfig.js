const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const userModel = require("./models/user");

function appConfig(app) {
    app.set("views", path.join(__dirname, "views")); // define my views folder
    app.set("view engine", "ejs"); // define the view engine of my app
    app.set("appName", "blog"); // define the name of my application
}

function appConfigMiddleware(app , express) {
    app.use(express.static(path.join(__dirname, "public"))); // define static folder of my app 
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));   
    
    app.use(session({
        name : process.env.SESSION_NAME,
        resave: false,
        saveUninitialized : false,
        store : MongoStore.create({ mongoUrl : process.env.DATABASE_URL}),
        secret : process.env.SESSION_SECRET,
        cookie : {
            maxAge : 1000 * 60 * 60 * 24,
            secure : false
        }
    }));

    app.use((request, response, next)=>{
        console.log(request.method, request.url);
        next();
    });

    // app.use(async (request, response, next)=>{
    //     const { userId } = request.session;
    //     if(userId) {
    //         response.locals.user = await userModel.findById(userId);
    //     } 
    //     next();
    // });
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