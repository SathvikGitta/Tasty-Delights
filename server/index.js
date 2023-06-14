const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Posts } = require("./models/index");
const bodyParser = require('body-parser');
const { verify } = require("jsonwebtoken");

app.use("/Images", express.static("./Images"));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const db = require("./models");

// Image Upload Controller
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./Images");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    },
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
            callback(
                new Error(
                    "Upload image does not support this format. Please use jpeg/png/jpg."
                )
            );
        }
    },
}).single("image");

// Middleware to validate the token and extract user information
const validateToken = (req, res, next) => {
    const authToken = req.header("Authorization");

    if (!authToken) {
        return res.status(401).json({ error: "User not logged in" });
    }

    try {
        const token = authToken.split(" ")[1]; // Extracting the token from "Bearer <token>"
        const validToken = verify(token, "importantSecret");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

// POST method - Create a recipe
app.post("/recipes", validateToken, upload, async (req, res) => {
    try {
        if (req.file == null) {
            return res.status(400).json({ error: "No image file provided." });
        }

        const { title, postText, category } = req.body;
        const image = req.file.filename;
        const { username } = req.user;

        const post = {
            image,
            title,
            postText,
            username,
            category,
        };

        await Posts.create(post);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to create recipe." });
    }
});

// GET method - Get user information
app.get("/auth/userinfo", validateToken, (req, res) => {
    const { username } = req.user;
    res.json({ username });
});

// GET method - Get all recipes
app.get("/recipes", async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.json(listOfPosts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes." });
    }
});

// GET method - Get a specific recipe by ID
app.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the post." });
    }
});

// PUT method - Update a specific recipe by ID
app.put("/recipes/:id", validateToken, upload, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        const { title, postText, category } = req.body;
        let image = post.image;
        const { username } = req.user;

        if (req.file) {
            image = req.file.filename;
        }

        const updatedPost = {
            image,
            title,
            postText,
            username,
            category,
        };

        await post.update(updatedPost);
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the post." });
    }
});

// DELETE method - Delete a specific recipe by ID
app.delete("/recipes/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        await post.destroy();
        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the post." });
    }
});

// GET method - Get user profile
app.get("/profile/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const userPosts = await Posts.findAll({
            where: { username },
            order: [["createdAt", "DESC"]],
        });
        res.json(userPosts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user profile." });
    }
});

// PUT method - Update user profile
app.put("/profile/:username", validateToken, async (req, res) => {
    const { username } = req.params;
    const { bio } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        await user.update({ bio });
        res.json({ message: "Profile updated successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user profile." });
    }
});

// DELETE method - Delete user profile
app.delete("/profile/:username", validateToken, async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        await user.destroy();
        res.json({ message: "Profile deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user profile." });
    }
});


// Other routes and configurations
// Routers
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const trendingPost = require("./routes/TrendingPosts");
app.use("/trending", trendingPost);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});
