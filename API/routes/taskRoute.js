const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

router.route('/additem').post((req, res) => {
  const task = req.body.task;
  const note = req.body.note;

  const newTask = new Task({
    task,
    note,
  });

  newTask.save();
});

router.route('/list').get((req, res) => {
  Task.find().then((foundTasks) => res.json(foundTasks));
});

module.exports = router;
