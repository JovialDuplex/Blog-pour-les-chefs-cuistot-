require("dotenv").config();
const express = require("express");
const config = require("./appconfig");
const routing = require("./routing/index");

const port = process.env.PORT || 3000;
const app = express();

config.appConfig(app);
config.appConfigMiddleware(app, express);

app.use("/blog", routing);
app.listen(port, _=>{

    console.log("server is listening on the localhost:%s ", port);
});
