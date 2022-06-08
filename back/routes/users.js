const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
// api/user/

// UPDATE
// user의 id를 통해 유저를 찾고 그 유저에 대한 정보를 변경
// react UseParms
router.put("/:id", async(req , res) => {
    if(req.body.userId === req.params.id){
        // if(req.body.password){
        //     const salt = await bcrypt.genSalt(10);
        //     req.body.password = await bcrypt.hash(req.body.password , salt)
        // }
        // 수정 구현완료 + 회원이름 중복 검사 필요.
        // 백에서 암호화 풀어서 넘겨주기 다시 디코딩
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,
                { $set : req.body },
                { new : true }
            )
            res.status(200).json(updateUser)
        } catch(err){   
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can update only your account")
    }
})  
// DELETE
// 유저를 삭제하면 유저가 생성했던 모든 post 제거
router.delete("/:id", async(req , res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            try{
                //user이름에 해당하는 모든 post 제거
                await Post.deleteMany({username : user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user Deleted")
            } catch(err){   
                res.status(500).json(err);
            }
        }catch(err){
            res.status(404).json("User not found")
        }}else{
        res.status(401).json("You can delete only your account")
    }

}) 
// GET USER
router.get("/:id" ,async(req ,res) =>{
    try{
        const user = await User.findById(req.params.id);
        const {...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;