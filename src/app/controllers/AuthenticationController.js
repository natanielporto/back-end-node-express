import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authenticator from '../../config/auth';

class AuthenticationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      passcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Ivalid data. Check the fields and try again.' });
    }

    const { email, passcode } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'User not found. Please try again.' });
    }

    if (!(await user.validatePassword(passcode))) {
      return res.status(401).json({ error: 'Sorry. Invalid password.' });
    }

    const { id } = user;

    return res.json({
      user: {
        email,
      },
      token: jwt.sign({ id }, authenticator.secret, {
        expiresIn: authenticator.expiresIn,
      }),
    });
  }
}

export default new AuthenticationController();
