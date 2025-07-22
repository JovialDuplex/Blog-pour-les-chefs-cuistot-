const joi = require("joi");

const userValidation = joi.object({
    name : joi.string().required().messages({"string.empty" : "Le nom de l'utilisateur est requis"}),
    email : joi.string().email().required().messages({
        "string.empty" : "L'email de l'utilisateur est obligatoire",
        "string.email" : "L'email entree est invalide",
    }),
    password : joi.string().required().messages({"string.empty" : "veuillez remplir votre mot de passe "})

});

const userValidationConnect = joi.object({
    email : joi.string().email().required().messages({
        "string.empty" : "L'email de l'utilisateur est obligatoire",
        "string.email" : "L'email entree est invalide",
    }),
    password : joi.string().required().messages({"string.empty" : "veuillez remplir votre mot de passe "})

});

module.exports = {userValidationRegister, userValidationConnect};