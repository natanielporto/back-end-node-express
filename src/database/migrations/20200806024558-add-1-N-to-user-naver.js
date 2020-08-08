module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'naver_id', {
      type: Sequelize.INTEGER,
      references: { model: 'navers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users', 'naver_id');
  },
};

// 48:00
