import * as Yup from 'yup';
import Naver from '../models/Naver';

export default async (req, res, next) => {
  const { id, user_id } = req.params;
  const hasNaver = await Naver.findByPk(id);

  if (!hasNaver || (!hasNaver && user_id !== hasNaver.user_id)) {
    res.status(400).json({
      message:
        'Error: you can only delete existing Navers and they have to be your Navers.',
    });
  }
  try {
    next();
  } catch (err) {
    res.json({ message: err });
  }
};
