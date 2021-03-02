import * as mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  id_user: String,
  coins: Number
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
