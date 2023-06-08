const express = require("express");
const router = express.Router();
const { Comments, Posts } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleWare")

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comments.findAll({
            where: { postId: postId },
        });
        res.json(comments);
    } catch (error) {
        console.log("An error occurred while fetching the comments:", error);
        res.status(500).json({ error: "Failed to fetch the comments" });
    }
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;
