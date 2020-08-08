module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('navers', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('navers', 'user_id');
  },
};
