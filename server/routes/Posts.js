const express = require("express");
const router = express.Router();
const { upload } = require("../index")
const { Posts } = require("../models");




router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts)
})


router.post("/", upload, async (req, res) => {
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


module.exports = router