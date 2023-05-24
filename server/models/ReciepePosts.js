module.exports = (sequelize, DataTypes) => {

    const RecipePost = sequelize.define("RecipePosts", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        titleDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return RecipePost
}