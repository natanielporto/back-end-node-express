import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';
import NaverController from './app/controllers/NaverController';
import AuthenticationController from './app/controllers/AuthenticationController';

import authMiddleware from './app/middlewares/authenticationMiddleware';

const routes = new Router();

routes.post('/user', UserController.store);

routes.use(authMiddleware);

routes.post('/project', ProjectController.store);
routes.post('/naver', NaverController.store);
routes.post('/authentication', AuthenticationController.store);

routes.put('/user', UserController.update);
routes.put('/project', ProjectController.update);

routes.get('/naver', NaverController.index);
routes.get('/naver/job/:job_role', NaverController.indexByRole);
routes.get('/naver/name/:name', NaverController.indexByName);

routes.get('/project', ProjectController.index);

routes.get('/user', UserController.index);

export default routes;
