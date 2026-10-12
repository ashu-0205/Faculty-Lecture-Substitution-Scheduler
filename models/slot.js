'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slot.hasMany(models.Lecture, {
    foreignKey: 'slotId'
  });
    }
  }
  Slot.init({
    slotName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },

    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Slot',
  });
  return Slot;
};