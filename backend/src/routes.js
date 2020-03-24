const express = require('express');

const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

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


//Session
routes.post('/sessions', SessionController.create);

//ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//Incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//Profile
routes.get('/profile', ProfileController.index);

module.exports = routes;
