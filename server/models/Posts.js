module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            foreignKey: 'postId',
            onDelete: 'cascade'
        });
    };

    return Posts;
};
