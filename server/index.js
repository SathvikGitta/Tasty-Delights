const express = require("express");
const app = express();
const cors = require('cors')
const multer = require("multer")
const path = require("path")
const { Posts } = require("./models");

// Static Image folder setup 
app.use('/Images', express.static("./Images"));


app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

const db = require("./models")

// Routers
const commentRouter = require("./routes/Comments")
app.use("/comments", commentRouter);

// Image Upload Controller
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Images')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: '10000000' },
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return callback(null, true)
        }
        callback('upload image does not support this format please use jpeg/png/jpg')
    }
}).single("image")


// GET & POST METHOD




app.get("/recipes", async (req, res) => {
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts)
})


app.post("/recipes", upload, async (req, res) => {
    const { image, title, postText, userName, category } = req.body;
    const post = {
        image: req.file.filename,
        title,
        postText,
        userName,
        category
    };
    await Posts.create(post);
    res.json(post)
})



// const recipes = await Recipe.findAll({
//     where: whereClause,
//     order: [['createdAt', 'DESC']],
//     limit: 6
// });



db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })
})

module.exports = {
    upload: upload
};