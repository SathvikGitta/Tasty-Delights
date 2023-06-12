const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/AuthMiddleWare")
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken"); // To generate token

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });

        res.json("registered user successfully");
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({
        where: { username: username },
        attributes: ["id", "username", "password"],
    });

    if (!user) {
        res.json({ error: "User doesn't exist. Please register." });
        return;
    }

    bcrypt.compare(password, user.password).then((passMatch) => {
        if (!passMatch) {
            res.json({ error: "Wrong username and password combination. Please try again." });
            return;
        }

        const authToken = sign({ username: user.username, id: user.id }, "importantSecret");

        res.json({ token: authToken, username: username, id: user }); // authToken is for client-side
    });
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user)
})
module.exports = router;
