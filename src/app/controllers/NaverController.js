import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Naver from '../models/Naver';
import Project from '../models/Project';

class NaverController {
  // creates a new naver - TESTED OK
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      job_role: Yup.string().required(),
      birth_date: Yup.date().required(),
      admission_date: Yup.date().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Informations are invalid. Please check them and try again.',
      });
    }

    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        error:
          'Informations are invalid. Provide a user Id in order to create a Naver.',
      });
    }

    const alredyNaver = await Naver.findOne({
      where: { email: req.body.email },
    });

    if (alredyNaver) {
      return res.status(400).json({
        message:
          'You are already a Naver. One cannot be two Navers at the same time, silly goose!',
      });
    }

    const { name, job_role, birth_date, admission_date, email } = req.body;

    try {
      await Naver.create({
        name,
        job_role,
        birth_date,
        admission_date,
        email,
        user_id,
      });

      return res.status(200).json({
        name,
        job_role,
        birth_date,
        admission_date,
        email,
        user_id,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  // delete a specific naver *owned by* the user - Works outside of Insomnia
  async delete(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'User information invalid. Please check it and try again.',
      });
    }

    const { id } = req.params;

    try {
      await Naver.destroy({ where: { id } });
    } catch (err) {
      res.status(500).json({ message: err });
    }
    return res.status(200);
  }

  // shows all navers created (just an extra)
  async indexAll(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'Id invalid. Please check it and try again.',
      });
    }
    const naver = await Naver.findAll({
      attributes: ['id', 'name', 'job_role', 'email', 'user_id'],
    });

    return res.json(naver);
  }

  // index by time with Nave - HAS ISSUES
  async indexByDate(req, res) {
    const naver = await Naver.findAll({
      order: ['created_at'],
      attributes: ['id', 'name', 'created_at'],
    });

    console.log('0', naver[0]);
    console.log('1', naver[1]);
    console.log('2', naver[2]);
    // const { created_at } = naver[2];
    // console.log(created_at);
    // console.log(Moment('19801017', 'YYYYMMDD').fromNow());

    try {
      return res.status(200).json(naver);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // list all users by job role - TESTED OK
  async indexByRole(req, res) {
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
    const { job_role } = req.params;

    const splitJob = job_role.split(' ');

    const job = splitJob[0];

    const naver = await Naver.findAll({
      where: { job_role: { [Sequelize.Op.iLike]: `${job}%` } },
      order: ['job_role'],
      attributes: ['id', 'name', 'job_role', 'email'],
    });

    return res.status(200).json(naver);
  }

  async indexByName(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'Informations are invalid. Please check them and try again.',
      });
    }

    const { name } = req.params;
    const splitName = name.split(' ');

    const firstName = splitName[0];

    const naver = await Naver.findAll({
      where: { name: { [Sequelize.Op.iLike]: `${firstName}%` } },
      order: ['name'],
      attributes: ['id', 'name', 'email'],
    });

    return res.status(200).json(naver);
  }

  // shows all navers related to an specific owner - TESTED OK
  async indexByNaverId(req, res) {
    const schema = Yup.object().shape({
      naver_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'User information invalid. Please check it and try again.',
      });
    }

    const { naver_id } = req.params;

    const naver = await Naver.findByPk(naver_id, {
      attributes: ['id', 'name', 'job_role'],
      include: {
        association: 'projects',
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    if (!naver) {
      res.status(400).json({ message: 'No Naver with that Id. Try again.' });
    }

    // const { name, job_role, birth_date, admission_date, email } = naver;

    return res.status(200).json(naver);
    // .json({ name, job_role, birth_date, admission_date, email });
  }

  // shows Navers by User ID
  async indexByUserId(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'User information invalid. Please check it and try again.',
      });
    }

    const { user_id } = req.params;

    const navers = await Naver.findAll({
      where: { user_id },
      order: ['name'],
      attributes: ['id', 'name', 'job_role', 'email'],
    });

    if (!navers) {
      res.status(400).json({ message: 'No Navers with that Id. Try again.' });
    }

    return res.status(200).json(navers);
  }
}

export default new NaverController();
