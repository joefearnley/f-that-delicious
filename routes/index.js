const express = require('express');
const router = express.Router();
const storeContoller = require('../controllers/storeController');

router.get('/', storeContoller.homePage);
router.get('/add', storeContoller.addStore);
router.post('/add', storeContoller.createStore);

module.exports = router;
