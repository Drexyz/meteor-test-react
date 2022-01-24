"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.hasOne(models.user, {
        as: "user",
        foreignKey: {
          name: "role_id",
        },
      });

      role.belongsTo(models.rbac, {
        as: "rbac",
        foreignKey: {
          name: "role_id",
        },
      });
    }
  }
  role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return role;
};
