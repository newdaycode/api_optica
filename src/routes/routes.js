import {Router} from 'express'
import { verify } from 'jsonwebtoken';
import controllers from '../controllers'
import { authJwt, verifySignup} from '../middlewares';
//se inicia el router
const router = Router()

/* Rutas de Login. */
router.post('/signin', controllers.authController.signin);     


/* Rutas de Usuarios. */
router.post('/user/create', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkProfilesExisted, verifySignup.checkDuplicateUserNameOrEmail], controllers.usersController.create);
// router.get('/user/list', [authJwt.verifyToken, authJwt.isUser], controllers.usersController.list);
router.get('/user/list', controllers.usersController.list);
router.post('/user/search', [authJwt.verifyToken, authJwt.isUser], controllers.usersController.search);
router.put('/user/update', [authJwt.verifyToken, authJwt.isAdmin], controllers.usersController.update);
router.delete('/user/delete', [authJwt.verifyToken, authJwt.isAdmin], controllers.usersController.delete);


/* Rutas de Clientes. */
router.post('/clients/create', controllers.clientsController.create);
// router.post('/clients/create', [authJwt.verifyToken, authJwt.isAdmin], controllers.clientsController.create);
router.get('/clients/list', controllers.clientsController.list);
// router.get('/clients/list', [authJwt.verifyToken, authJwt.isUser], controllers.clientsController.list);
router.post('/clients/search', [authJwt.verifyToken, authJwt.isUser], controllers.clientsController.search);
router.put('/clients/update',  controllers.clientsController.update);
// router.put('/clients/update', [authJwt.verifyToken, authJwt.isAdmin], controllers.clientsController.update);
router.delete('/clients/:id/delete', controllers.clientsController.delete);
// router.delete('/clients/delete', [authJwt.verifyToken, authJwt.isAdmin], controllers.clientsController.delete);

/* Rutas de Proveedores. */
router.post('/provider/create', controllers.providersController.create);
router.get('/provider/list', controllers.providersController.list);
// router.post('/provider/search', controllers.providersController.search);
router.put('/provider/update', controllers.providersController.update);
router.delete('/provider/:id/delete', controllers.providersController.delete);

/* Rutas de Proveedores. */
// router.post('/product/create', controllers.productsController.create);
router.get('/product/list', controllers.productsController.list);
// router.post('/product/search', controllers.productsController.search);
// router.put('/product/update', controllers.productsController.update);
// router.delete('/product/delete', controllers.productsController.delete);
                

/* Rutas para Cotizaciones*/
// router.post('/budget/create', controllers.budgetController.create);
// router.get('/budget/list', controllers.budgetController.list);


/* Rutas de Base de datos. */
// router.get('/db/create', controllers.configController.createDatabase);
// router.get('/tablas/create', controllers.configController.createTablas);
// router.get('/tablas/insertar', controllers.configController.insertarRegistros);
// router.get('/tablas/secuencias', controllers.configController.configSecuencias);

// /* ruta salir */
// router.get('/logout', AuthMiddleware.verifyToken,controllers.loginController.getSalir);

module.exports = router;

