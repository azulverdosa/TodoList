const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, maxLength: 500 },
  password: { type: String, required: true, maxLength: 500 },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
