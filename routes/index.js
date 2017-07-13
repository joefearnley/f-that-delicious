const express = require('express');
const router = express.Router();
const storeContoller = require('../controllers/storeController');

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeContoller.getStores));
router.get('/stores', catchErrors(storeContoller.getStores));
router.get('/add', storeContoller.addStore);
router.post('/add', catchErrors(storeContoller.createStore));

module.exports = router;
