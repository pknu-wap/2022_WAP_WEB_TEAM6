const router = require("express").Router();
// const { Router } = require("express");
// const { modelNames } = require("mongoose");
const User = require("../models/User");

// db에서 password를 암호화 하기위한 module
// const bcrypt = require("bcrypt");


// api/auth/register
router.post("/register", async(req , res) => {
    try{
        // const salt = await bcrypt.genSalt(10);
        // hash알고리즘으로 비밀번호를 암호화 함
        // const hashedPass = await bcrypt.hash(req.body.password ,salt);
        const newUser = new User({
       // 서버에 보낼수 있는 데이터의 양식을 지정
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            grade : req.body.grade,
            major : req.body.major,
        })
        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err);
    }
})

// LOGIN
// react function , const , async
router.post("/login" , async(req, res) => {
    try {
        // User의 email -> unique : true
        const user = await User.findOne({ email : req.body.email })
        if(!user){
            return res.status(400).json("이메일 정보가 일치 하지 않습니다")
        }
        
        const validated = await User.findOne({password : req.body.password})
        // 비밀번호 암호화
        // const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            return res.status(400).json("비밀번호 정보가 일치하지 않습니다");
        }
        //js 배열 구조 분해 할당
        //spread 연산자 -> 객체배열 복사 (참조가 아닌 복사)
        //쉼표를 사용하면 필요하지 않는 요소를 제거 할 수 있다.
        //복사이기 때문에 원래의 값은 변하지 않는다
        const{password, ...others} = user._doc;
        res.status(200).json(others);
    }catch (err){
        res.status(500).json(err);
    }
})

module.exports = router;