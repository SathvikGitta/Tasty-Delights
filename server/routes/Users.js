const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            username: username,
            password: hashedPassword,
        });

        res.json("registered user");
    } catch (error) {
        res.status(500).json({ error: "Failed to create user.", details: error });
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
            return res
                .status(401)
                .json({ error: "Wrong username and password combination" });
        }
        const accessToken = sign({ username: user.username, id: user.id }, "importantsecret")

        res.json({ accessToken });
    });
});

module.exports = router;





