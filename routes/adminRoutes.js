import express from "express"
import Admin from "../models/adminModel.js";
import Blog from "../models/blogModel.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
config();

const router = new express.Router();

router.get("/", async(req, res) => {
    res.render("adminLogin");
});

router.post("/", async(req, res) => {
    const {email, password} = req.body;
    if (email === process.env.OWNER_EMAIL && password === process.env.OWNER_PASSWORD){
        const token = jwt.sign({userEmail : email}, process.env.SECRET_KEY);
        res.cookie("token", token, {expires : new Date(Date.now() + 86400000), httpOnly : true});
        res.redirect("/admin/blogs");
    }else{
        res.render("adminLogin", {
            errorMessage : "Invalid Details",
            emailValue : email,
            passwordValue : password
        });
    }
})

router.get("/blogs", auth, async(req, res) => {
    const blogs = await Blog.find({});
    res.render("adminBlogs", {blogs});
})

router.get("/blogs/add", auth, async(req, res) => {
    res.render("addBlog");
})

router.post("/blogs", auth, async(req, res) => {
    const {title, description} = req.body;
    if (title && description){
        const blog = new Blog({
            title : title,
            description : description
        });
        await blog.save();
        res.redirect("/admin/blogs");
    }else{
       res.render("message", {
            message : "All fields are required",
            link : "/admin/blogs/add"
       })
    }
})

router.get("/blogs/update/:id", auth, async(req, res) => {
    const {id} = req.params;
    try{
        const blog = await Blog.findOne({_id : id});
        res.render("updateBlog", {
            titleValue : blog.title,
            descriptionValue : blog.description,
            id : id
        })
    }catch(err){
        res.render("message", {
            message : "Invalid request",
            link : "/admin/blogs"
        })
    }   
})

router.patch("/blogs/:id", auth, async(req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    if (title && description){
        try{
            await Blog.findByIdAndUpdate(id, {
                title : title,
                description : description
            });
            res.redirect("/admin/blogs");
        }
        catch{
            res.render("message", {
                message : "Invalid request",
                link : `/admin/blogs`
            })
        }
    }else{
        res.render("message", {
            message : "All fields are required",
            link : `/admin/blogs/update/${id}`
        })
    }
})

router.delete("/blogs/:id", auth, async(req, res) => {
    const {id} = req.params
    try{
        await Blog.findByIdAndDelete(id);
        res.redirect("/admin/blogs");
    }catch(err){
        res.render("message", {
            message : "Invalid request",
            link : "/admin/blogs"
        })
    }
})

router.get("/blogs/:id", auth, async(req, res) => {
    try{
        const {id} = req.params;
        const blog = await Blog.findOne({_id : id});
        res.render("blog", {
            blog : blog,
            backLink : "/admin/blogs"
        })
    }catch(err){
        res.render("message", {
            message : "Invalid Request",
            link : "/admin/blogs"
        })
    }
})


export default router;