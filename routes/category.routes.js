//POST localhost:8888/ecomm/api/v1/category
const category_controller = require('../controllers/category.controller');
const authMW = require('../middlewares/auth_middleware');

module.exports = (app) => {
    app.post("/ecomm/api/v1/category", [authMW.verifyToken, authMW.isAdmin], category_controller.createNewCategory);
}

