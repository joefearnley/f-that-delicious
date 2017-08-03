const express = require('express');
const router = express.Router();
const storeContoller = require('../controllers/storeController');

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeContoller.getStores));
router.get('/stores', catchErrors(storeContoller.getStores));
router.get('/add', storeContoller.addStore);
router.post('/add', 
  storeContoller.upload, 
  catchErrors(storeContoller.resize),
  catchErrors(storeContoller.createStore)
);
router.post('/add/:id', 
  storeContoller.upload, 
  catchErrors(storeContoller.resize),
  catchErrors(storeContoller.updateStore)
);
router.get('/stores/:id/edit', catchErrors(storeContoller.editStore));
router.get('/store/:slug', catchErrors(storeContoller.getStoreBySlug));
router.get('/tags', catchErrors(storeContoller.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeContoller.getStoresByTag));

module.exports = router;
