"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rbac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rbac.belongsTo(models.role, {
        as: "role",
        foreignKey: {
          name: "role_id",
        },
      });

      rbac.belongsTo(models.route, {
        as: "route",
        foreignKey: {
          name: "route_id",
        },
      });
    }
  }
  rbac.init(
    {
      role_id: DataTypes.INTEGER,
      route_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "rbac",
    }
  );
  return rbac;
};
