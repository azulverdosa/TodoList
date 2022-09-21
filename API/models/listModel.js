const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true, maxLength: 500 },
});

const List = mongoose.model('List', ListSchema);

module.exports = List;
