import pkg from 'express';

import StateController from './app/controllers/StateController.js';
import CityController from './app/controllers/CityController.js';

const { Router } = pkg;
const routes = new Router();

routes.get('/states', StateController.index);
routes.get('/states/:id', StateController.show);
routes.post('/states', StateController.store);
routes.put('/states/:id', StateController.update);
routes.delete('/states/:id', StateController.remove);

routes.get('/cities', CityController.index);
routes.get('/cities/:id', CityController.show);
routes.post('/cities', CityController.store);
routes.put('/cities/:id', CityController.update);
routes.delete('/cities/:id', CityController.remove);

export default routes;