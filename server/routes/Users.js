const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken")

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            username: username,
            password: hashedPassword,
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user." }, error);
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }

    bcrypt.compare(password, user.password).then((userMatch) => {
        if (!userMatch) {
            return res.status(401).json({ error: "Wrong username and password combination" });
        }
        const acessToken = sign(
            { username: user.username, id: user.id }, "importantSecret"
        );
        res.json(acessToken);
    });
});

module.exports = router;
