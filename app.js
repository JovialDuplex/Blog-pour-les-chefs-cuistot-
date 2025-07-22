require("dotenv").config();
const express = require("express");
const config = require("./appconfig");

const port = process.env.PORT || 3000;

const app = express();
config.appConfig(app);
config.appConfigMiddleware(app, express);

app.listen(port, _=>{

    console.log("server is listening on the localhost:%s ", port);
});
