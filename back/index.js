const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoyRoute = require("./routes/categories")
const reviewRoute = require("./routes/resReview")

const multer = require("multer");
const path = require("path")

dotenv.config();

//서버 url을 가져와서 데이터를 전송하거나 받을때 json 형식으로 받을수 있게함
app.use(express.json());
app.use("/images/" ,express.static(path.join(__dirname , "/images")))

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })  
    .then(console.log("mongo ready"))
    .catch((err) => console.log(err));

        const storage = multer.diskStorage({
            destination: (req, file , cb) =>{
                cb(null, "images")
            },
            filename : (req, file , cb) => {
                cb(null , req.body.name)
            },
        })

        const upload = multer({storage : storage});
        app.post("/api/upload", upload.single("file") , (req, res) => {
            res.status(200).json("file uploaded")
        });

    app.use("/api/auth" , authRoute)
    app.use("/api/users", userRoute)
    app.use("/api/posts", postRoute)
    app.use("/api/categories" , categoyRoute)
    app.use("/api/reviews" , reviewRoute)

app.use("/woong",(req, res) => {
    console.log("this is woong url")
})

app.listen("5000" , () => {
    console.log("Backend is ready")
})  

// user authentation , category , post