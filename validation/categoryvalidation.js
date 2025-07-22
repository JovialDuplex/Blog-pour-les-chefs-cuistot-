const joi = require("joi");

const category_validation = joi.object({
    category_name : joi.string().required().messages({"string.empty" : "Veuillez remplir le nom de la categorie"})
});

module.exports = categoryValidation;