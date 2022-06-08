const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");

// api/category

router.post("/" , async(req, res) => {
    const newCategory = new Category({
        name : req.body.name,
        categoryImg : req.body.categoryImg
    })  
    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    }catch(err){
        res.status(500).json(err);
    }
})

// GET ALL CATEGORIES
router.get("/" , async(req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router;