const ResReview = require("../models/ResReview");
const router = require("express").Router();

// Create review
router.post("/", async(req , res) => {
    const newReview = new ResReview(
        req.body
    )
    try{
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    }catch(err){
        res.status(500).json(err);
    }
})
// get Review
router.get("/", async(req,res) => {
    const resName = req.query.resName;
    const author = req.query.author
    try{
        let reviews;
        if(resName){
            reviews = await ResReview.find({
                resName : resName
            })
        }else if(author){
            reviews = await ResReview.find({
                author : author
            })
        }
        else{ 
            reviews = await ResReview.find()
        }  
        res.status(200).json(reviews); 
    }catch{ 
        res.status(500).json(err);
    }
})
// Update reivew
router.put("/:id", async(req, res) =>{
    try{
        // const review = await ResReview.findById(req.params.id)
        if(req.body.reviewId === req.params.id){
            try{
                const updateReview = await ResReview.findByIdAndUpdate(
                    req.params.id,{
                        reviewTitle : req.body.reviewTitle,
                        resName : req.body.resName,
                        desc : req.body.desc,
                        author : req.body.author,
                    }, {new : true});
                    res.status(200).json(updateReview)
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("you can update only your review")
        }
    }catch {
        res.status(500).json(err)
    }
})
//Delete reviews
router.delete("/:id" , async(req , res) =>{
    try{
        const review = await ResReview.findById(req.params.id)
        if(review.author === req.body.author){
            try{
                await review.delete();
                res.status(200).json("review delete")
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("you can delete only your review")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
// export as router
module.exports = router;