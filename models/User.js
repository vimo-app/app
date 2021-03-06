const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  instagramID: String,
  facebookID: String,
  userPhoto: {type: String, default: "/images/default/LogoVdark.png"},
  albums: [{ type : Schema.Types.ObjectId, ref: 'Album' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
