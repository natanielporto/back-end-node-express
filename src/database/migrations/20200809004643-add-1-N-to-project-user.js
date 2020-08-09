module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('projects', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('projects', 'user_id');
  },
};
