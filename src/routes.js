import { Router } from 'express';

// controllers
import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';
import NaverController from './app/controllers/NaverController';
import AuthenticationController from './app/controllers/AuthenticationController';

// middlewares
import authMiddleware from './app/middlewares/authenticationMiddleware';
import userNaverMiddleware from './app/middlewares/userNaverMiddleware';
import userProjectMiddleware from './app/middlewares/userProjectMiddleware';

const routes = new Router();

// user routes - before jwt token
routes.post('/user', UserController.store);
routes.post('/authentication', AuthenticationController.store);

// garantees that every route is only accessible by loged users
routes.use(authMiddleware);

// user routes - after jwt token
routes.get('/user', UserController.index);
routes.get('/user/:user_id/naver', UserController.indexByNavers);
routes.put('/user', UserController.update);

// project routes
// routes.get('/project', ProjectController.index);

// ALL PROJECT ROUTES TESTED

// ALL PROJECT ROUTES NOT TESTED
routes.post('/naver/:user_id/project', ProjectController.store);
routes.delete(
  '/project/:user_id/:id',
  userProjectMiddleware,
  ProjectController.delete
);
routes.delete(
  '/naver/:naver_id/project',
  ProjectController.deleteProjectFromUser
);
routes.get('/naver/:naver_id/project', ProjectController.index);
routes.get('/project/user/:user_id', ProjectController.indexByUser);
routes.put('/project/', ProjectController.update);

// naver routes - tested and ok
routes.post('/:user_id/naver', NaverController.store);
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
