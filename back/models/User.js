const mongoose = require("mongoose")
// 이름 , 이메일 ,비밀번호 , 학번 , 학년 , 전공
const UserSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true    
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    grade : {
        type : String,
        required : true
    },
    major : {
        type : String,
        required : true
    },
    profileImg : {
        type : String,
        default : ""
    },
},
{ timestamps : true}
);

module.exports = mongoose.model("User", UserSchema)