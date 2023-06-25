import jwt from "jsonwebtoken"
import Blog from "../models/blogModel.js";

const auth = async(req, res, next) => {
    const {token} = req.cookies;
    if (token){
        try{
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            // res.redirect("/admin/dashboard");
            next();
        }catch(err){
            res.redirect("/admin");
        }
    }else{
        res.redirect("/admin");
    }

}

export default auth;