const router = require("express").Router()
const fs = require("fs");
const path = require("path");
const validationArticle = require("../validation/articlevalidation");
const {storageArticleImage} = require("../appconfig");
const categoryModel = require("../models/category");
const articleModel = require("../models/article");
const multer = require("multer");
const { request } = require("http");
const { PassThrough } = require("stream");
const mongooseType = require("mongoose").Schema.Types;

var form_data = {
    list_category : [],
    errors : [],
}


// Recuperation de la liste des categories 

categoryModel.find({}).then((result)=>{
    form_data.list_category = result;

}).catch((error)=>{
    throw new Error("une erreur est survenue lors de la lecture de la base de donnee : ", error);
});

// upload des fichier pour l'article 
const upload = multer({
    storage : storageArticleImage,
});

// autres routes utile -----------------------------------------------
router.get("/add-article-page/", (request, response)=>{
    response.render("addArticlePage", form_data);
});

router.get("/update-article-page/:id_article", async (request, response)=>{
    const article = await articleModel.findById(request.params.id_article);
    form_data.article = article;
    response.render("updateArticle", form_data);
});


// -------------------------------- GESTION DES ARTICLES ------------------------------------------------ 

// AJOUT DE L'ARTICLE ---------------------------------
router.post("/add-article-page/add", upload.single("article_image"),(request, response, next)=>{
    // validation du formulaire 
    console.log("validation du formulaire ");
    const validation_data = {
        ...request.body,
        article_image : request.file ? {
            size : request.file.size,
            mimetype : request.file.mimetype,

        } : null,
    };

    const {error} = validationArticle.validate(validation_data, {abortEarly : false});
    if(error) {
        const details = error.details.map(detail=>({
            msg : detail.message,
            path : detail.path.join("."),
        }));

        form_data.errors = details;
        response.render("addArticlePage", form_data);
        
        form_data.errors = [];

    } else {
        console.log("aucune erreur lors de la validation du formulaire ");
        return next();
    }

}, (request, response)=>{

    const myarticle = new articleModel({
        article_title : request.body.article_title,
        article_descrip : request.body.article_descrip,
        article_content : request.body.article_content,
        article_category : request.body.article_category,
        article_image : "/upload/articles/" + request.file.filename,
    });

    myarticle.save().then(_=>{
        console.log("article enregistrer avec succes ");
        response.redirect("/blog/article");

    }).catch(error => {
        console.log("une erreur est survenue lors de l'enregistrement de l'article: ", error);
    });

    console.log(myarticle);
});

// AFFICHAGE DE L'ARTICLE ---------------------------------------
router.get("/show/:id_article", async (request, response)=>{
    // get article in database 
    const article = await articleModel.findById(request.params.id_article);
    response.render("showArticle", {article : article});
    
});

// SUPPRESSION DE L'ARTICLE-------------------------------------
router.delete("/delete/:id_article", async (request, response)=>{
    const article = await articleModel.findById(request.params.id_article);

    console.log(article.article_image);
    fs.unlink(path.join(__dirname, "..", "public", article.article_image), (error)=>{
        if (error) {
            throw new Error("une erreur est survenue lors de la suppression du fichier ");
        }
        console.log("Suppression du fichier fait avec succes ");
    });

    articleModel.deleteOne({_id : request.params.id_article}).then(_=>{
        console.log("article supprimer avec succes ");
        response.redirect("/blog/article");
    }).catch(error => {
        console.log("erreur survenue lors de la suppression de l'article ");
        response.status(500).send("erreur survenue lors de la suppression de l'article ")
    })
});



// MISE A JOUR DE L'ARTICLE 
router.post("/update-article-page/update/:id_article", upload.single("article_image"), async (request, response)=>{
    const myarticle = await articleModel.findById(request.params.id_article);

    const updateData = {
        article_title : request.body.article_title,
        article_descrip : request.body.article_descrip,
        article_content : request.body.article_content,
        article_category : request.body.article_category,
    };

    if(request.file) {
        updateData.article_image = "/upload/articles/" + request.file.filename;
        fs.unlinkSync(path.join(__dirname, "..", "public", myarticle.article_image));
    }
    
    const article = await articleModel.findByIdAndUpdate(request.params.id_article, updateData, { new : true, runValidators : true});
    
    if(article) {
        console.log("article mis a jour avec succes ");
        response.redirect("/blog/article/");
    } else {
        console.log("article non trouve ");
        response.status(404).json({error : "article non trouvee"});
    }
});

module.exports = router;