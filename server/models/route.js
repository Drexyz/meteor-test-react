"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      route.hasMany(models.rbac, {
        as: "rbac",
        foreignKey: {
          name: "route_id",
        },
      });
    }
  }
  route.init(
    {
      method: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "route",
    }
  );
  return route;
};
