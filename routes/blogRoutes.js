import express from "express";
import Blog from "../models/blogModel.js";

const router = new express.Router();

router.get("/", async(req, res) => {
    res.render("home")
})

router.get("/blogs", async(req, res) => {
    let {search} = req.query;
    let queryObject = {};
    if (search){    
        queryObject = {
            $or : [
                {title : {$regex : search.trim(), $options : "i"}},
                {description : {$regex : search.trim(), $options : "i"}}
            ]
        }
    }
    const blogs = await Blog.find(queryObject);
    res.render("blogs", {blogs});
});

router.get("/blogs/:id", async(req, res) => {
    const {id} = req.params;
    try{
        const blog = await Blog.findById(id);
        res.render("blog", {
            blog : blog,
            backLink : "/blogs" 
        });
    }catch(err){
        res.render("message", {
            message : "Invalid Request",
            link : "/blogs"
        })
    }
})


export default router;