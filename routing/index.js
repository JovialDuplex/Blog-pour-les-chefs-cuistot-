const router = require("express").Router();
const articleRouting = require("./routingArticle");
const articleModel = require("../models/article");
const userRouting = require("./routingUser");
const userModel = require("../models/user");

const protectRoute = (request, response, next)=>{
    const {userId} = request.session;
    if(userId) {
        next();
    } else {
        user = undefined;
        response.redirect("/blog/user/connection");
    }
};

router.get("/article", protectRoute, async (request, response) => {
    // get list of article 
    try {
        const {userId} = request.session;
        const user = await userModel.findById(userId);
        const list_article = await articleModel.find({});

        response.render("articles/index", {list_article : list_article, user : user})
    } 
    catch(error) {
        throw new Error("Une erreur c'est produite lors de la lecture en base de donne : ", error);
    }
 
});

router.get("/user", protectRoute, async (request, response)=>{
    const {userId} = request.session;
    const user = await userModel.findById(userId);
    response.render("users/index", {user : user});     
});

router.use("/user", userRouting);
router.use("/article", articleRouting);
module.exports = router;