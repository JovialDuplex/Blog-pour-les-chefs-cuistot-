require("dotenv").config();
const express = require("express");
const config = require("./appconfig");
const routing = require("./routing/index");
const userModel = require("./models/user");

const port = process.env.PORT || 3000;
const app = express();

config.appConfig(app);
config.appConfigMiddleware(app, express);

app.get("/blog/", async (request, response)=> {
    const {userId} = request.session;
    if(userId) {
        const user = await userModel.findById(userId);
        response.render("index", {user : user});
    } else {
        response.render("index", {user : {}});    
    }
});

app.use("/blog", routing);

app.listen(port, _=>{

    console.log("server is listening on the localhost:%s ", port);
});
