const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    reviewTitle : {
        type : String,
        required : true
    },
    resName : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        require : true
    },
    desc : {
        type : String,
        required : true
    },
})

module.exports = mongoose.model("ResReview" , ReviewSchema);