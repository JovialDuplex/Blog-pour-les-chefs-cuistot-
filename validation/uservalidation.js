const joi = require("joi");

const userValidationRegister = joi.object({
    user_name : joi.string().required().messages({"string.empty" : "Le nom de l'utilisateur est requis"}),
    user_email : joi.string().email().required().messages({
        "string.empty" : "L'email de l'utilisateur est obligatoire",
        "string.email" : "L'email entree est invalide",
    }),
    user_password : joi.string().required().messages({"string.empty" : "veuillez remplir votre mot de passe "}),
    user_image : joi.object({
        mimetype : joi.string()
                   .valid("image/jpg", "image/png", "image/gif")
                   .messages({
                        "any.allowOnly" : "Seuls les images de type png, jpg, et gif sont autorise",
                   }),

        size : joi.number().max(1024*1024*5).messages({
            "number.max" : "la taille du fichier ne doit pas depasse {#limits} octet",
        }),
    }),
    
});

const userValidationConnect = joi.object({
    user_email : joi.string().email().required().messages({
        "string.empty" : "L'email de l'utilisateur est obligatoire",
        "string.email" : "L'email entree est invalide",
    }),
    user_password : joi.string().required().messages({"string.empty" : "veuillez remplir votre mot de passe "})

});

module.exports = {userValidationRegister, userValidationConnect};