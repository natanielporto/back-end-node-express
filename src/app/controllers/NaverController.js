// import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Naver from '../models/Naver';

class NaverController {
  async store(req, res) {
    const alredyNaver = await Naver.findOne({
      where: { email: req.body.email },
    });

    if (alredyNaver) {
      return res.status(400).json({
        message:
          'You are already a Naver. One cannot be two Navers at the same time, silly goose!',
      });
    }

    const { user_id } = req.params;
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

  async index(req, res) {
    const naver = await Naver.findAll({
      attributes: [
        'id',
        'name',
        'job_role',
        'birth_date',
        'admission_date',
        'email',
        'user_id',
      ],
    });

    return res.json(naver);
  }

  async indexById(req, res) {
    const { id } = req.params;

    const naver = await Naver.findByPk(id);

    if (!naver) {
      res.status(400).json({ message: 'No Naver with that Id. Try again.' });
    }

    const { name, job_role, birth_date, admission_date, email } = naver;

    return res
      .status(200)
      .json({ name, job_role, birth_date, admission_date, email });
  }

  async indexByUserId(req, res) {
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

  async indexByRole(req, res) {
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

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Naver.destroy({ where: { id } });
    } catch (err) {
      res.status(500).json({ message: err });
    }
    return res.status(200);
  }
}

export default new NaverController();
