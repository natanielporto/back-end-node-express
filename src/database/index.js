import Sequelize from 'sequelize';

import User from '../app/models/User';
import Project from '../app/models/Project';
import Naver from '../app/models/Naver';

import databaseConfig from '../config/database';

const models = [User, Naver, Project];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
