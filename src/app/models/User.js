import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        passcode: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.passcode) {
        user.password = await bcrypt.hash(user.passcode, 10);
      }
    });

    return this;
  }

  validatePassword(passcode) {
    return bcrypt.compare(passcode, this.password);
  }

  static associate(models) {
    this.hasMany(models.Naver);
  }
}

export default User;
