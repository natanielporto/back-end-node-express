import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';
import NaverController from './app/controllers/NaverController';
import AuthenticationController from './app/controllers/AuthenticationController';

import authMiddleware from './app/middlewares/authenticationMiddleware';
import deleteMiddleware from './app/middlewares/deleteMiddleware';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/authentication', AuthenticationController.store);

routes.use(authMiddleware);

routes.post('/project', ProjectController.store);
routes.post('/user/:user_id/naver', NaverController.store);

routes.put('/user', UserController.update);
routes.put('/project', ProjectController.update);

routes.get('/naver', NaverController.index);
routes.get('/naver/job/:job_role', NaverController.indexByRole);
routes.get('/naver/name/:name', NaverController.indexByName);

routes.get('/project', ProjectController.index);
routes.get('/user', UserController.index);

routes.delete('/project/:id', ProjectController.delete);
routes.delete('/naver/:user_id/:id', deleteMiddleware, NaverController.delete);

export default routes;
