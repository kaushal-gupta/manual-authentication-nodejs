const express= require('express');

const routes = express.Router();

const userController = require('../controllers/user_controller');

routes.use('/profile',userController.profile);


routes.get('/sign-in',userController.signIn);
routes.get('/sign-up',userController.signUp)

routes.post('/create',userController.create);

routes.post('/create-session',userController.createSession);
routes.post('/clear-session',userController.clearSession);

module.exports=routes;