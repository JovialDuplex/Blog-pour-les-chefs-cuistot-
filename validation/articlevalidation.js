const joi = require("joi");

const articleValidation = joi.object({
    article_title : joi.string()
                    .required()
                    .max(16)
                    .messages({
                        "string.empty" : "Le titre de l'article est requis",
                        "string.max" : "Le titre de l'article ne doit pas depasse {#limits} caracteres"
                    }),

    article_descrip : joi.string()
                      .required()
                      .max(256)
                      .message({
                        "string.empty" : "La description de l'article est obligatoire ",
                        "string.max" : "La description de l'article ne doit pas depasse {#limits} caracteres"
                      }),

    article_content : joi.string()
                      .required()
                      .messages({
                        "string.empty" : "Le contenu de l'article est obligatoire"
                      }),
    article_category : joi.string()
                       .required()
                       .messages({
                        "string.empty" : "la categorie de l'article est obligatoire"
                       }),

    article_image : joi.object({
        mimetype : joi.string()
                   .valid("image/jpg", "image/png", "image/bmp", "image/gif")
                   .required()
                   .messages({
                        "any.allowOnly" : "Seuls les images jpg, png, bmp et gif sont autorisees "
                        
                    }),

        size : joi.number()
               .max(5*1024*1024)
               .messages({
                "number.max" : "La taille du fichier ne pas depasse {#limits} caracteres "
               }),     
    }).required().messages({
      "object.base" : "L'image de l'article est obligatoire",
      "any.required" : "L'image de l'article est obligatoire"
    }),
   
    // article_create_date : joi.date()
    //                       .required()
    //                       .default(Date.now())
    //                       .messages({
    //                         "any.required" : "La date de creation de l'article est obligatoire"
    //                       }), 

    article_category : joi.string() 
                       .required()
                       .messages({"string.empty" : "La categorie de l'article est obligatoire "}),   
});

module.exports = articleValidation;