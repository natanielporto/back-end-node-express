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
      name: Yup.string().required().min(6),
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
        error: 'New name invalid. Please check it and try again.',
      });
    }

    console.log(req.params);

    const project = await Project.findByPk(req.params.id);

    const { name, newName } = req.body;

    if (!project) {
      return res
        .status(400)
        .json({ error: 'No project with that code to be modified.' });
    }

    if (newName && newName === name) {
      return res
        .status(401)
        .json({ error: 'Names match. Choose a different name.' });
    }

    await project.update(req.params.id, req.body);

    return res.json({ newName });
  }

  async index(req, res) {
    const projects = await Project.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(projects);
  }
}

export default new ProjectController();
