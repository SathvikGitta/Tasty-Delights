const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())

// connnection to db 
const db = require("./models")


// Router
const recipePost = require("./routes/Recipes");
app.use("/recipes", recipePost);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on 3001")
    })
});