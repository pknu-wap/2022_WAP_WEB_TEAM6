const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    // post title , unique
    title : {
        type : String,
        required : true,
        unique : true
    },
    desc : {
        type : String,
        required : true,
    },
    photo : {
        type : String,
        required : true,
    },
    username : {
        type : String ,
        required : true
    },
    categories : {
        // [korea , china , japan etc,,,]
        type : Array ,
        required : false
    },
    locations : {
        type: Object ,
        require : true
    }
},
{ timestamps : true}
);

module.exports = mongoose.model("Post", PostSchema)