const router = require('express').Router();

const homeController = require('../controllers/homePage');

router.get('/', homeController);

module.exports = router;