import { Router } from 'express';

// controllers - tested and ok
import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';
import NaverController from './app/controllers/NaverController';
import AuthenticationController from './app/controllers/AuthenticationController';

// middlewares - tested and ok
import authMiddleware from './app/middlewares/authenticationMiddleware';
import userNaverMiddleware from './app/middlewares/userNaverMiddleware';
import userProjectMiddleware from './app/middlewares/userProjectMiddleware';

const routes = new Router();

// user routes - before jwt token - tested and ok
routes.post('/user', UserController.store);
routes.post('/authentication', AuthenticationController.store);

// garantees that every route is only accessible by loged users - tested and ok
routes.use(authMiddleware);

// user routes - after jwt token - tested and ok
routes.get('/user', UserController.index);
routes.get('/user/:user_id/naver', UserController.indexByNavers);
routes.put('/user', UserController.update);

// project routes
// routes.get('/project', ProjectController.index);

// project routes - tested and ok
routes.post('/naver/:user_id/project', ProjectController.store);
routes.delete(
  '/project/:user_id/:id',
  userProjectMiddleware,
  ProjectController.delete
);
routes.delete(
  '/naver/:naver_id/:project_id',
  ProjectController.deleteProjectFromUser
);
routes.get('/naver/:naver_id/project', ProjectController.indexByNaver);
routes.get('/project/naver/:user_id', ProjectController.indexByUser);
routes.put('/project/:user_id/:project_id', ProjectController.update);

// naver routes - tested and ok
routes.post('/:user_id/naver', NaverController.store);
routes.put('/naver/:user_id/:naver_id', NaverController.update);
routes.delete(
  '/user/:user_id/naver/:id',
  userNaverMiddleware,
  NaverController.delete
);
routes.get('/:user_id/naver', NaverController.indexAll);
routes.get('/naver/date', NaverController.indexByDate);
routes.get('/naver/job/:job_role', NaverController.indexByRole);
routes.get('/naver/name/:name', NaverController.indexByName);
routes.get('/naver/:naver_id', NaverController.indexByNaverId);
routes.get('/user/:user_id/naver', NaverController.indexByUserId);

export default routes;
