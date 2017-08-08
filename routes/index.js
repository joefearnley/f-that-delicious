const express = require('express');
const router = express.Router();
const storeContoller = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeContoller.getStores));
router.get('/stores', catchErrors(storeContoller.getStores));
router.get('/add', 
  authController.isLoggedIn,
  storeContoller.addStore
);
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

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
router.get('/logout', authController.logout);

module.exports = router;
