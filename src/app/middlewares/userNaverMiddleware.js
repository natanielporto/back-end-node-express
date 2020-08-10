import * as Yup from 'yup';
import Naver from '../models/Naver';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
    user_id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.params))) {
    return res.status(400).json({
      error:
        'User or Naver information invalid. Please check them and try again.',
    });
  }

  const { id, user_id } = req.params;
  const hasNaver = await Naver.findByPk(id);

  const itHas = !!hasNaver;

  if (itHas && Number(hasNaver.user_id) !== Number(user_id)) {
    return res.status(400).json({
      message:
        'Error: you can only delete or update existing Navers and they have to be your Navers.',
    });
  }

  return next();
};
