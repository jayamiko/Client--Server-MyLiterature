'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      collections.belongsTo(models.user, {
        foreignkey: {
          name: "userId"
        }
      })
      collections.belongsTo(models.literature, {
        foreignkey: {
          name: "literatureId"
        }
      })
    }
  };
  collections.init({
    userId: DataTypes.INTEGER,
    literatureId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'collections',
  });
  return collections;
};