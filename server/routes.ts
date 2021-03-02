import * as express from 'express';

import BundleController from './controllers/bundle';
import UserController from './controllers/user';
import WalletController from './controllers/wallet';

export default function setRoutes(app) {

  const router = express.Router();

  const bundleController = new BundleController();
  const userController = new UserController();
  const walletController = new WalletController();

  // Wallets
  router.route('/wallets').get(walletController.getAll);
  router.route('/wallets/count').get(walletController.count);
  router.route('/wallet').post(walletController.insert);
  router.route('/wallet/:id').get(walletController.get);
  router.route('/wallet/user/:id').get(walletController.getByUserId);

  // Bundles
  router.route('/bundles').get(bundleController.getAll);
  router.route('/bundles/count').get(bundleController.count);
  router.route('/bundle').post(bundleController.insert);
  router.route('/bundle/:id').get(bundleController.get);
  router.route('/bundle/:id').put(bundleController.update);
  router.route('/bundle/:id').delete(bundleController.delete);

  // Users
  router.route('/login').post(userController.login);
  router.route('/users').get(userController.getAll);
  router.route('/users/count').get(userController.count);
  router.route('/user').post(userController.insert);
  router.route('/user/:id').get(userController.get);
  router.route('/user/:id').put(userController.update);
  router.route('/user/deactivate/:id').put(userController.update);
  router.route('/user/:id').delete(userController.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
