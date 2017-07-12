const express = require('express');
const router = express.Router();
const storeContoller = require('../controllers/storeController');

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', storeContoller.homePage);
router.get('/add', storeContoller.addStore);
router.post('/add', catchErrors(storeContoller.createStore));

module.exports = router;
