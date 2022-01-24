"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.role, {
        as: "role",
        foreignKey: {
          name: "role_id",
        },
      });
    }
  }
  user.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
