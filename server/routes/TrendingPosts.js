const express = require("express");
const router = express.Router();
const { Posts } = require("../models");




router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll({
        order: [['createdAt', 'DESC']],
        limit: 6
    })
    res.json(listOfPosts)
})


router.post("/", async (req, res) => {
    const { title, postText, userName, category } = req.body;
    const post = {
        title,
        postText,
        userName,
        category
    };
    await Posts.create(post);
    res.json(post)
})


module.exports = router