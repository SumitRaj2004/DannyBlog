import express from "express";
import hbs from "hbs";
import methodOverride from "method-override"
import cookieParser from "cookie-parser";
import path from "path"
import url from "url";
import blogRouter from "./routes/blogRoutes.js";
import adminRouter from "./routes/adminRoutes.js"
import "./config/dbConn.js"
import { config } from "dotenv";
config();


const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const publicPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use("/", blogRouter);
app.use("/admin", adminRouter)
app.get("*", (req, res) =>{
    res.render("message", {
        message : "Invalid Request",
        link : "/"
    })
})





app.listen(process.env.PORT, () => {
    console.log(`started listening to request on port ${process.env.PORT}`);
})