const mongoose = require("mongoose");
const mongooseType = mongoose.Schema.Types;

const categorySchema = mongoose.Schema({
    category_name : {
        type : mongooseType.String,
        required : true,
        trim : true,
    }
}, {collection : "category"});

const categoryModel = mongoose.model("category", categorySchema);

module.exports =  categoryModel;