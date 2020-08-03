import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      passcode: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Informations are invalid. Please check them and try again.',
      });
    }

    const inDataBase = await User.findOne({ where: { email: req.body.email } });

    if (!inDataBase) {
      const { email, password } = await User.create(req.body);

      return res.json({ email, password });
    }

    return res.status(400).json({
      message: 'This e-mail is already being used by another person.',
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      oldPasscode: Yup.string().min(6),
      passcode: Yup.string()
        .min(6)
        .when('oldPasscode', (oldPasscode, field) =>
          oldPasscode ? field.required() : field
        ),
      confirmPasscode: Yup.string().when('passcode', (passcode, field) =>
        passcode ? field.required().oneOf([Yup.ref('passcode')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Informations are invalid. Please check them and try again.',
      });
    }

    const { email, oldPasscode } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const inDatabase = await User.findOne({ where: { email } });

      if (inDatabase) {
        return res.status(400).json({ error: 'User already created.' });
      }
    }

    if (oldPasscode && !(await user.validatePassword(oldPasscode))) {
      return res
        .status(401)
        .json({ error: 'Password does not match. Try again.' });
    }

    const { id, passcode } = await user.update(req.body);

    return res.json({ id, email, passcode });
  }

  async index(req, res) {
    const users = await User.findAll({ attributes: ['id', 'email'] });

    return res.json(users);
  }
}

export default new UserController();
