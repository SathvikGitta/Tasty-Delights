const express = require("express");
const app = express();
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const { Posts } = require("./models/index");

app.use('/Images', express.static("./Images"));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const db = require("./models");


// Image Upload Controller
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Images');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            callback(null, true);
        } else {
            callback(new Error('Upload image does not support this format. Please use jpeg/png/jpg.'));
        }
    }
}).single("image");

// GET & POST METHODS
app.post("/recipes", upload, async (req, res) => {
    try {
        if (req.file == null) {
            return res.status(400).json({ error: "No image file provided." });
        }

        const { title, postText, userName, category } = req.body;
        const image = req.file.filename;

        const post = {
            image,
            title,
            postText,
            userName,
            category,
        };

        await Posts.create(post);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to create recipe." });
    }
});


app.get("/recipes", async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(listOfPosts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes." });
    }
});

app.get("/recipes/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findOne({ where: { id } });
    res.json(post);
});


// Routers
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const trendingPost = require("./routes/TrendingPosts");
app.use("/trending", trendingPost);


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});
