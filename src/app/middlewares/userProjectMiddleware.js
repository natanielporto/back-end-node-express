import * as Yup from 'yup';
import Project from '../models/Project';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
    user_id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.params))) {
    return res.status(400).json({
      error:
        'User or Project information invalid. Please check them and try again.',
    });
  }

  const { id, user_id } = req.params;
  const hasProject = await Project.findByPk(id);

  const itHas = !!hasProject;

  if (itHas && Number(hasProject.UserId) !== Number(user_id)) {
    return res.status(400).json({
      message:
        'Error: you can only delete or update existing Projects and they have to be your Navers.',
    });
  }

  return next();
};
