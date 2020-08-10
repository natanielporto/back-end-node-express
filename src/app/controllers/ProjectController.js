import * as Yup from 'yup';
import Project from '../models/Project';
import Naver from '../models/Naver';

class ProjectController {
  // creates a new project for a naver - TESTED OK
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Informations are invalid. Please check them and try again.',
      });
    }

    const { user_id } = req.params;
    const { naver_id } = req.body;
    const { name } = req.body;

    const naver = await Naver.findByPk(naver_id);

    if (!naver || !user_id) {
      return res
        .status(400)
        .json({ error: 'Invalid user or Naver information. Try again.' });
    }

    const [project] = await Project.findOrCreate({
      where: { name },
    });

    await naver.addProject(project);

    return res.status(200).json(project);
  }

  // delete a full project - TESTED OK
  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'Please, inform a valid Id to delete a project.',
      });
    }

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      res
        .status(400)
        .json({ message: 'No project to be deleted with that Id.' });
    }

    const { id } = project;

    try {
      await Project.destroy({ where: { id } });
    } catch (err) {
      res.status(400).json({ message: err });
    }

    return res.status(200).json();
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
    const { naver_id } = req.params;

    const navers = await Naver.findByPk(naver_id, {
      include: {
        association: 'projects',
      },
    });

    return res.json(navers.projects);
  }

  // before - works
  // async index(req, res) {
  //   const projects = await Project.findAll({
  //     attributes: ['id', 'name'],
  //   });

  //   return res.json(projects);
  // }

  async indexByUser(req, res) {
    const { user_id } = req.params;

    const projects = await Project.findAll({
      where: { user_id },
      order: ['name'],
      attributes: ['id', 'name'],
    });

    if (!projects) {
      res.status(400).json({ message: 'No projects with that Id. Try again.' });
    }

    return res.status(200).json(projects);
  }

  // NEW - WORKS
  async deleteProjectFromUser(req, res) {
    const schema = Yup.object().shape({
      naver_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({
        error: 'Please, inform a valid Id to delete a project.',
      });
    }

    const { naver_id } = req.params;
    const { name } = req.body;

    const naver = await Naver.findByPk(naver_id);

    if (!naver) {
      return res.status(400).json({ error: 'Naver not found. Try again.' });
    }

    const project = await Project.findOne({
      where: { name },
    });

    await naver.removeProject(project);

    return res.status(200).json();
  }
}

export default new ProjectController();
