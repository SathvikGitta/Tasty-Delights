const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const authToken = req.header("Authorization");

    if (!authToken) {
        return res.status(401).json({ error: "User not logged in" });
    }

    try {
        const token = authToken.split(" ")[1]; // Extracting the token from "Bearer <token>"
        const validToken = verify(token, "importantSecret");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = { validateToken };
