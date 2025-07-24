const router = require("express").Router();
const articleRouting = require("./routingArticle");
const fs = require("fs");
const path = require("path");


router.get("/article", (request, response) => {
    // get list of article 
    console.log(path.join(__dirname, "..", "database.json"));
    fs.readFile(path.join(__dirname, "..", "database.json"), (error, data)=>{
        if(error) {
            throw error;
        } 
        else {
            const articleList = JSON.parse(data.toString()).articles;

            response.render("index", {list_article : articleList});
        }
    });

});

router.use("/article", articleRouting);
module.exports = router;