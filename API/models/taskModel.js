const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: { type: String },
  task: { type: String, required: true, maxLength: 500 },
  note: { type: String, required: true, maxLength: 500 },
  completed: { type: Boolean, required: true },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
