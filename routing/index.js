const router = require("express").Router();
const articleRouting = require("./routingArticle");
const articleModel = require("../models/article");


router.get("/article", (request, response) => {
    // get list of article 
    articleModel.find({}).then(result => {
        response.render("index", {list_article : result});
        
    }).catch(error=> {
        throw new Error("une erreur c'est produite lors de la lecture en base de donnee : ", result);
    });

});

router.use("/article", articleRouting);
module.exports = router;