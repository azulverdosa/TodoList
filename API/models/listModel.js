const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  id: { type: String, required: false },
  title: { type: String, required: true, maxLength: 500 },
  note: { type: String, required: false, maxLength: 500 },
  tasks: { type: Array, required: false },
  owner: { type: String, required: false },
});

const List = mongoose.model('List', ListSchema);

module.exports = List;
