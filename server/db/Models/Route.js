const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  name: { type: String, required: true, unique: true },
  path: { type: String, required: true, unique: true },
  route: { type: String, required: true, unique: true },
  published: { type: Boolean, default: true },
  page: { type: Schema.Types.ObjectId, ref: 'page' },
});

const RouteModel = mongoose.model('route', RouteSchema);
module.exports = RouteModel;
