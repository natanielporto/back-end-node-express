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
}

export default new NaverController();
