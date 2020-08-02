import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        nickname: Sequelize.STRING,
        email: Sequelize.STRING,
        passcode: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.passcode) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });
  }
}

export default User;
