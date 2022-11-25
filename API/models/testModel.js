const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true, maxLength: 500 },
});

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
