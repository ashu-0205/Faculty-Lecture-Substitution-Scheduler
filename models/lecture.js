'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lecture.belongsTo(models.Faculty, {
    foreignKey: 'facultyId'
  });

  Lecture.belongsTo(models.Slot, {
    foreignKey: 'slotId'
  });
    }
  }
  Lecture.init({
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lectureDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    room: {
      type: DataTypes.STRING,
      allowNull: false
    },

    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Lecture',
  });
  return Lecture;
};