import Project from '../models/Project';

class ProjectController {
  async store(req, res) {
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
}

export default new ProjectController();
