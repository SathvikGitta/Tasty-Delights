const express = require("express");
const router = express.Router();
const { Comments, Posts } = require("../models");
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) {
        return res.status(401).json({ error: "User not logged in" });
    }

    try {
        const validToken = verify(accessToken, "importantSecret");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

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

router.post("/", async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;
