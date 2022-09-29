const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

const getAllTasks = (res) => Task.find().then((foundTasks) => res.json(foundTasks));

router.route('/').get((req, res) => {
  getAllTasks(res);
});

router.route('/').post((req, res) => {
  const title = req.body.title;
  const note = req.body.note;
  const completed = req.body.completed;

  const newTask = new Task({
    title,
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

router.route('/:taskId').post((req, res) => {
  const taskId = req.params.taskId;
  const title = req.body.title;
  const note = req.body.note;

  //I want this to update any changes - or just update all as if one doesn't change it's the same anyway
  Task.findByIdAndUpdate(taskId, { title, note })
    .then((blah) => {
      console.log(blah);
      getAllTasks(res);
    })
    .catch((err) => {
      console.log(`Failed to update task ${taskId}`, err);
      res.sendStatus(500);
    });
  console.log('meow');
});

module.exports = router;
