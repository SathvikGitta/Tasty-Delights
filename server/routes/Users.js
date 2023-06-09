const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt")


router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash
        })

        res.json("registered user successfully")
    })
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({
        where: { username: username },
        attributes: ["id", "username", "password"],
    });

    if (!user) res.json({ error: "user Doesn't Exit please registered" })


    bcrypt.compare(password, user.password).then((passMatch) => {
        if (!passMatch) {
            res.json({ error: "Wrong username and password combination please try again" })
            return
        }
        res.json("Your are logged in ")
    })  // Comparing the password from db and decrypt the password


})
module.exports = router;





