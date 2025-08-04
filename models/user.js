const mongoose = require("mongoose");
const mongooseType = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
    user_name : {
        type : mongooseType.String,
        required : true,
    },

    user_email : {
        type : mongooseType.String,
        required : true,
    },

    user_password : {
        type : mongooseType.String,
        required : true,
    },

    user_image : {
        type: mongooseType.String,
        select : true,
        required : false,

    }
}, {collection : "user"});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;