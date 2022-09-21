const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

router.route('/additem').post((req, res) => {
  const id = req.body._id;
  const task = req.body.task;
  const note = req.body.note;
  const completed = req.body.completed;

  const newTask = new Task({
    id,
    task,
    note,
    completed,
  });

  newTask.save();
});

router.route('/task').get((req, res) => {
  Task.find().then((foundTasks) => res.json(foundTasks));
});

router.route(`/task/:taskId`).delete((req, res) => {});

module.exports = router;
