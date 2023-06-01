const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleWare");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comments.findAll({ where: { PostId: postId } });
        res.json(comments);
    } catch (error) {
        console.log("An error occurred while fetching the comments:", error);
        res.status(500).json({ error: "Failed to fetch the comments" });
    }
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username; // Set the username field

    try {
        const createdComment = await Comments.create(comment);
        res.json(createdComment);
    } catch (error) {
        console.log("An error occurred while creating the comment:", error);

        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map((err) => err.message);
            res.status(400).json({ error: validationErrors });
        } else {
            res.status(500).json({ error: "Failed to create the comment" });
        }
    }
});

module.exports = router;
