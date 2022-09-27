const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

const getAllTasks = (res) => Task.find().then((foundTasks) => res.json(foundTasks));

router.route('/').get((req, res) => {
  getAllTasks(res);
});

router.route('/').post((req, res) => {
  const task = req.body.task;
  const note = req.body.note;
  const completed = req.body.completed;

  const newTask = new Task({
    task,
    note,
    completed,
  });

  newTask.save().then(() => {
    getAllTasks(res);
  });
});

router.route(`/:taskId`).delete((req, res) => {
  const taskId = req.params.taskId;

  Task.findByIdAndRemove(taskId)
    .then(() => {
      getAllTasks(res);
    })
    .catch((err) => {
      console.log(`Failed deleting task ${taskId}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
