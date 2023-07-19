//import required packages
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
console.log('router is loaded');

router.get('/', homeController.home);
router.get('/token', homeController.deleteTokon);
router.get('/interest', homeController.deleteInterest);
router.use('/users', require('./users'));
router.use('/questions', require('./questions'));
router.use('/answers', require('./answers'));
router.use('/comments', require('./comment'));
module.exports = router;