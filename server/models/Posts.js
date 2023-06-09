module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  
  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: 'userId', // Add this line to specify the foreign key
    });
    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };


  return Posts;
};
