const express = require('express');
const router = express.Router();
const storeContoller = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
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
router.get('/stores/:slug', catchErrors(storeContoller.getStoreBySlug));
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
router.get('/account', userController.account);
router.post('/account', userController.updateAccount);
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
router.get('/map', storeContoller.mapPage);
router.get('/hearts', 
  authController.isLoggedIn,
  storeContoller.heartedStores
);
router.post('/reviews/:id',
  authController.isLoggedIn,
  catchErrors(reviewController.addReview)
);


router.get('/api/search', catchErrors(storeContoller.seachStores));
router.get('/api/stores/near', catchErrors(storeContoller.mapStores));
router.post('/api/stores/:id/heart', catchErrors(storeContoller.heartStore));



module.exports = router;
