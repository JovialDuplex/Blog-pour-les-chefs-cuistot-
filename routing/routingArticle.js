const router = require("express").Router()
const fs = require("fs");
const path = require("path");

router.get("/show/:id_article", (request, response)=>{
    // get article in database 
    fs.readFile(path.join(__dirname, "..", "database.json"), (error, data)=>{
        const articles = JSON.parse(data.toString()).articles;
        if(error){
            throw new Error("Une erreur est survenue : ", error);
        } else {
            articles.forEach(function(article){
                if(article.article_id === parseInt(request.params.id_article, 10)) {
                    console.log(article);
                    response.render("showArticle", {article : article});
                }
            });
        }
    });    
});

module.exports = router;