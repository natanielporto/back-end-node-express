// import * as Yup from 'yup';
import Naver from '../models/Naver';

class NaverController {
  async store(req, res) {
    const alredyNaver = await Naver.findOne({
      where: { email: req.body.email },
    });

    if (!alredyNaver) {
      const {
        id,
        name,
        job_role,
        birth_date,
        admission_date,
        email,
      } = await Naver.create(req.body);

      return res.json({
        id,
        name,
        job_role,
        birth_date,
        admission_date,
        email,
      });
    }

    return res.status(400).json({
      message:
        'You are already a Naver. One cannot be two Navers at the same time, silly goose!',
    });
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
    console.log(name);
    const splitName = name.split(' ');
    console.log(splitName);

    const firstName = splitName[0];
    console.log(firstName);

    const naver = await Naver.findAll({
      where: { name: firstName },
      order: ['name'],
      attributes: ['id', 'name', 'email'],
    });

    return res.json(naver);
  }
}

export default new NaverController();
