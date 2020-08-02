import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';
import NaverController from './app/controllers/NaverController';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/project', ProjectController.store);

routes.post('/naver', NaverController.store);

export default routes;
