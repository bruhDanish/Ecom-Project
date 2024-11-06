const authController = require('../controllers/auth.controller');
const authMW = require('../middlewares/auth_middleware')

module.exports = (app) => {
    /*
    POST localhost:8888/ecomm/api/v1/auth/signup
    need to intercept this
    */
    app.post('/ecomm/api/v1/auth/signup', [authMW.verifySignUpBody], authController.signup);

    // route for POST localhost:8888/ecomm/api/v1/auth/signin
    app.post('/ecomm/api/v1/auth/signin', [authMW.verifySignInBody], authController.signin);
}