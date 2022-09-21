const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: { type: String, required: true, maxLength: 500 },
  note: { type: String, required: true, maxLength: 500 },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
