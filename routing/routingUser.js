const router = require('express').Router();
const userModel = require("../models/user");
const {storageUserImage} = require("../appconfig");
const multer = require("multer");

const {userValidationRegister, userValidationConnect} = require("../validation/uservalidation");
const bcrypt = require("bcryptjs");

const form_data = {
    errors : [],
};

const upload = multer({
    storage : storageUserImage
});

router.get("/connection", (request, response) => {
    response.render("users/connect", form_data);
});

router.get("/register", (request, response)=>{
    response.render("users/register", form_data);
});


// ------------- GESTION DES UTILISATEURS ------------------------

// connexion des utilisateurs -----------------
router.post("/connection", (request, response, next)=>{
    // validation du formulaire
    const { error } = userValidationConnect.validate(request.body, {abortEarly : false});
    if(error) {
        const details = error.details.map(detail=> ({
            msg : detail.message,
            path : detail.path.join("."),
        }));

        form_data.errors = details;
        console.log(form_data);
        response.render("users/connect", form_data);
        form_data.errors = [];
    }

    else {
        console.log("aucune erreur dans la validation du formulaire d'enregistrement ");
        return next();
    }

}, async (request, response)=>{
    console.log(request.body);
    const user = await userModel.find({ user_email : request.body.user_email});
    if(user){
        const myuser = user[0];

        if(await bcrypt.compare(request.body.user_password, myuser.user_password)){
            request.session.userId = myuser._id;
            response.send(`bienvenue Monsieurs : ${myuser.user_name}`);
        
        } else {
            response.send("mot de passe incorrect");
        }
    } 

    else {
        form_data.errors = [{
            msg : "mot de passe ou email incorrect", 
            path : "all"
        }];

        response.send("utilisateur non trouve ");
    }
});

// enregistrement des utilisateurs --------------
router.post("/register", upload.single("user_image"), (request, response, next)=> {
    //validation du formulaire 
    console.log("validation du formulaire d'enregistrement ");
    const validateData = {
        ...request.body,
        user_image : request.file ? {
            mimetype : request.file.mimetype,
            size : request.file.size,
        } : {},
    };

    const { error } = userValidationRegister.validate(validateData, {abortEarly : false});
    if(error) {
        const details = error.details.map(detail => ({
            msg : detail.message,
            path : detail.path.join("."),
        }));

        form_data.errors = details;
        response.render("users/register", form_data);
        form_data.errors = [];  
    }

    else {
        // si il n'y a aucune erreur    
        return next();
    }

}, async (request, response)=>{
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(request.body.user_password, salt);

    const newUser = new userModel({
        user_name : request.body.user_name,
        user_email : request.body.user_email,
        user_password : hasPassword,
        user_image : request.file ? "/upload/users/" + request.file.filename : '',
    });

    newUser.save().then((result)=>{
        console.log("Utilisateur enregistrer avec succes : ", result);
        request.session.userId = newUser._id;
        
        response.render("index", {user : newUser});

    }).catch(error=>{
        console.log("erreur lors de l'enregistrement de l'article : ", error);
        response.json({error : error});
    });
});

module.exports = router;