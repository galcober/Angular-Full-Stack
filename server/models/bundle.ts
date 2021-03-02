import * as mongoose from 'mongoose';

const bundleSchema = new mongoose.Schema({
  name: String,
  bundleTitle: String,
  img: String,
  active: Boolean,
  value: Number,
  date: Date
});

const Bundle = mongoose.model('Bundle', bundleSchema);

export default Bundle;
