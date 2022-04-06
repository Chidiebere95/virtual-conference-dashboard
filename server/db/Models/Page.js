const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  name: { type: String, required: true, unique: true },
  path: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  thumbnail: { type: String },
  published: { type: Boolean, default: true },
  route: [{ type: Schema.Types.ObjectId, ref: 'route' }],
  created_by: { type: Schema.Types.ObjectId, ref: 'admin' },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const PageModel = mongoose.model('page', PageSchema);
module.exports = PageModel;
