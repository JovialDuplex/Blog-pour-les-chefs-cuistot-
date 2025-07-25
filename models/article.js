const mongoose = require("mongoose");
const mongooseType = mongoose.Schema.Types;

const articleSchema = mongoose.Schema({
    article_title : {
        type : mongooseType.String,
        required : true,
        maxlength : 16,
        trim : true,
        uppercase : true,
    },

    article_descrip : {
        type : mongooseType.String,
        required : true,
        maxlength : 256,
        trim : true,
    },

    article_content : {
        type : mongooseType.String,
        required : true,
    },

    article_category : {
        type : mongooseType.ObjectId,
        required : true,
        ref : "category"
    },

    article_image : {
        type : mongooseType.String,
        required : true
    }
}, {collection : "article"});

const articleModel = mongoose.model("article", articleSchema);

module.exports = articleModel