const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('project', 'naver_id', {
      type: Sequelize.ARRAY(DataTypes.INTEGER),
      references: { model: 'naver', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('project', 'naver_id');
  },
};
