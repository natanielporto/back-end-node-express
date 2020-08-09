import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Naver, {
      foreignKey: 'project_id',
      through: 'naver_project',
      as: 'navers',
    });
  }
}

export default Project;
