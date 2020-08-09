import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';
import NaverController from './app/controllers/NaverController';
import AuthenticationController from './app/controllers/AuthenticationController';

import authMiddleware from './app/middlewares/authenticationMiddleware';
import userNaverMiddleware from './app/middlewares/userNaverMiddleware';
import userProjectMiddleware from './app/middlewares/userProjectMiddleware';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/authentication', AuthenticationController.store);

routes.use(authMiddleware);

routes.post('/:user_id/project', ProjectController.store);
routes.post('/:user_id/naver', NaverController.store);

routes.put('/user', UserController.update);
routes.put('/project/', ProjectController.update);

routes.get('/naver', NaverController.index);
routes.get('/naver/:id', NaverController.indexById);
routes.get('/naver/user/:user_id', NaverController.indexByUserId);
routes.get('/naver/job/:job_role', NaverController.indexByRole);
routes.get('/naver/name/:name', NaverController.indexByName);

routes.get('/project', ProjectController.index);
routes.get('/project/user/:user_id', ProjectController.indexByUser);
routes.get('/user', UserController.index);

routes.delete(
  '/project/:user_id/:id',
  userProjectMiddleware,
  ProjectController.delete
);
routes.delete(
  '/naver/:user_id/:id',
  userNaverMiddleware,
  NaverController.delete
);

export default routes;
