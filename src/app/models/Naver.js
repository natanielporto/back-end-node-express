import Sequelize, { Model } from 'sequelize';

class Naver extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        job_role: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        admission_date: Sequelize.DATE,
        email: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Naver;
