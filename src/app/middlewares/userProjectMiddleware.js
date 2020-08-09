import * as Yup from 'yup';
import Project from '../models/Project';

export default async (req, res, next) => {
  const { id, user_id } = req.params;
  const hasProject = await Project.findByPk(id);

  if (!hasProject || (!hasProject && user_id !== hasProject.user_id)) {
    res.status(400).json({
      message:
        'Error: you can only delete or update existing Projects and they have to be your Projects.',
    });
  }
  try {
    next();
  } catch (err) {
    res.json({ message: err });
  }
};
