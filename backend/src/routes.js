const express = require('express');

const routes = express.Router();

//CONTROLLERS
const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//VALIDATORS
const IncidentGet = require('./validators/Incident/Get');
const IncidentPost = require('./validators/Incident/Post');
const IncidentDelete = require('./validators/Incident/Delete');
const OngPost = require('./validators/Ong/Post');
const ProfileGet = require('./validators/Profile/Get');
const SessionPost = require('./validators/Session/Post');

/**
 * Métodos HTTP:
 * 
 * GET: Buscar / Listar informações do backend
 * POST: Criar informações no backend
 * PUT: Alterar informações no backend
 * DELETE: Deletar informações no backend
 */

 /**
  * Tipos de Parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após "?". Utilizado para filtros e paginação, por exemplo.
  * Route Params: Parâmetros utilizados para identificar recursos.
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos.
  */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, SQL Server, etc.
  * NOSQL: MongoDB, CouchDB, Redis, etc.
  */



/** ROUTES
 * Format: (route, validator, controller.method)
 */


//Incidents
routes.get('/incidents', IncidentGet, IncidentController.index);
routes.post('/incidents', IncidentPost, IncidentController.create);
routes.delete('/incidents/:id', IncidentDelete, IncidentController.delete);

//ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngPost, OngController.create);

//Profile
routes.get('/profile', ProfileGet, ProfileController.index);

//Session
routes.post('/sessions', SessionPost, SessionController.create);

module.exports = routes;
