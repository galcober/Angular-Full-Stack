import Wallet from '../models/wallet';
import BaseController from './base';

export default class WalletController extends BaseController {
  model = Wallet;

  // Get by user id
  getByUserId = async (req, res) => {
    try {
      const obj = await this.model.findOne({ id_user: req.params.id });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
