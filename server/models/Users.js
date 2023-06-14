module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            foreignKey: 'userId', // Add this line to specify the foreign key
            onDelete: "cascade",
        });
    };

    return Users;
};
