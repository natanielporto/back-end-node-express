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
      return res.json(err);
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
      ],
    });

    return res.json(naver);
  }

  async indexByRole(req, res) {
    const naver = await Naver.findAll({
      where: { job_role: req.params.job_role },
      order: ['job_role'],
      attributes: ['id', 'name', 'job_role', 'email'],
    });

    return res.json(naver);
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

    return res.json(naver);
  }
}

export default new NaverController();
