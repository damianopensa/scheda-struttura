var express = require('express');
var router = express.Router();


// Require our controllers
var anagrafica_controller = require('../controllers/anagraficaController'); 

var book_controller = require('../controllers/bookController'); 
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');


/// ANAGRAFICA ROUTES ///

/* GET 'schedastruttura' home page. */
router.get('/', anagrafica_controller.index);

/* GET request for creating a anagrafica. NOTE This must come before routes that display anagrafica (uses id) */
router.get('/anagrafica/create', anagrafica_controller.anagrafica_create_get);

/* POST request for creating anagrafica. */
router.post('/anagrafica/create', anagrafica_controller.anagrafica_create_post);

/* GET request to delete anagrafica. */
router.get('/anagrafica/:id/delete', anagrafica_controller.anagrafica_delete_get);

// POST request to delete anagrafica
router.post('/anagrafica/:id/delete', anagrafica_controller.anagrafica_delete_post);

/* GET request to update anagrafica. */
router.get('/anagrafica/:id/update', anagrafica_controller.anagrafica_update_get);

// POST request to update anagrafica
router.post('/anagrafica/:id/update', anagrafica_controller.anagrafica_update_post);

/* GET request for one anagrafica. */
router.get('/anagrafica/:id', anagrafica_controller.anagrafica_detail);

/* GET request for list of all anagrafica. */
router.get('/anagraficas', anagrafica_controller.anagrafica_list);

module.exports = router;
