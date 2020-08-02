import User from '../models/User';

class UserController {
  async store(req, res) {
    const inDataBase = await User.findOne({ where: { email: req.body.email } });

    if (!inDataBase) {
      const { email, password } = await User.create(req.body);

      return res.json({ email, password });
    }

    return res.status(400).json({
      message: 'This e-mail is already being used by another person.',
    });
  }
}

export default new UserController();
