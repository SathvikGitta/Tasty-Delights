const express = require("express")
const router = express.Router()
const { RecipePosts } = require("../models")

router.get("/", async (req, res) => {
    const listofRecipePosts = await RecipePosts.findAll({
        limit: 6,
        order: [['createdAt', "DESC"]]
    });
    res.json(listofRecipePosts)
})


router.post("/", async (req, res) => {
    const posts = req.body;
    await RecipePosts.create(posts)
    res.send(posts);
})

module.exports = router;