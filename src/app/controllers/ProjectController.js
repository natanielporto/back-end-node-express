import * as Yup from 'yup';
import Project from '../models/Project';

class ProjectController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Informations are invalid. Please check them and try again.',
      });
    }

    try {
      const wasCreated = await Project.findOne({
        where: { name: req.body.name },
      });

      if (!wasCreated) {
        const { name } = await Project.create(req.body);

        return res.json(name);
      }

      return res.status(400).json({
        message:
          'A project with that name is already rolling. Please choose a new one.',
      });
    } catch (err) {
      return res.json(err);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      newName: Yup.string().required().min(6),
      confirmName: Yup.string()
        .required()
        .min(6)
        .when('newName', (newName, field) =>
          newName ? field.required().oneOf([Yup.ref('newName')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Id, new name (min. 6 characters) and name confirmation needed to update.',
      });
    }

    const { id, newName } = req.body;

    const project = await Project.findByPk(id);

    const { name } = project;

    if (!project) {
      return res
        .status(400)
        .json({ error: 'No project with that code to be modified.' });
    }

    if (newName && newName === name) {
      return res
        .status(400)
        .json({ error: 'Names match. Choose a different name.' });
    }

    try {
      await Project.update({ name: newName }, { where: { id } });

      return res
        .status(200)
        .json({ message: `Project ${name} updated to: ${newName}` });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  async index(req, res) {
    const projects = await Project.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(projects);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'Please, pass a valid Id to delete a project.',
      });
    }

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      res
        .status(400)
        .json({ message: 'No project to be deleted with that Id.' });
    }

    const { id, name } = project;

    try {
      await Project.destroy({ where: { id } });
    } catch (err) {
      res.status(400).json({ message: 'no' });
    }

    return res.status(200).json({ message: `Project ${name} deleted.` });
  }
}

export default new ProjectController();
