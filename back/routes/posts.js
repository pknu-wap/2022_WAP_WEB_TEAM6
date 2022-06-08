const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


// api/user/

// CREATE POST
router.post("/", async(req , res) => {
    const newPost = new Post(req.body)
    try{
        const sevedPost = await newPost.save();
        res.status(200).json(sevedPost)
    }catch(err){
        res.status(500).json(err);
    }
})  

// UPDATE POST
router.put("/:id", async(req , res) => {
    try{
        // const post = await Post.findById(req.params.id)
        if(req.body.postId === req.params.id){
            try{
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id,{
                    title : req.body.title,
                    desc : req.body.desc,
                    photo : req.body.photo,
                    username : req.body.username,
                    categories : req.body.categories,
                    locations : req.body.locations
                    // $set : req.body
                } ,{new : true});
                res.status(200).json(updatePost)
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("you can update only your post")
        }
    }catch(err){
        res.status(500).json(err)
    }
}) 

//DETETE POST
router.delete("/:id" ,async(req ,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                await post.delete()
                res.status(200).json("Post deleted")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("you can delete only your post")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/:id" ,async(req ,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL POST 
//get url is main url , fetch all data -> query
//비동기 async 함수에서 await을 쓰는 타이밍은 언제인가
//모든 글들을 보여주겠지만 , 사용자가 카테고리를 클릭하면 해당 카테고리의 글들만 보여주게 처리 해야함
// $set, $in
// 아무런 조건을 걸지 않은상태 -> 즉 , 메인페이지 에서는 모든 post를 보이게 하고 하나의 post를 클릭하거나, 특정 user가 쓴 글을 보려고 하거나 , 하나의 category를 선택해 글을 보려고 하면 조건을 통해서 Post.find 를 제한
router.get("/", async(req, res) => {
    // router.get("/?user="woong",) 과 같음
    // query 문으로 조건을 걸어서 api를 만듦
    const userName = req.query.user; 
    const catName = req.query.category;
    try{ 
        let posts;
        if(userName){
            posts = await Post.find({
                username : userName
            }) 
        }else if (catName){
            posts = await Post.find({
                categories  : {
                    $in:[catName]}
            })       
        }else{
            posts = await Post.find();
        }res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;