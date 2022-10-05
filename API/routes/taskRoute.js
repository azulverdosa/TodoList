const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const List = require('../models/listModel');

const getAllTasks = async (res, ids = []) => {
  const filter = ids?.length ? { _id: { $in: ids } } : {};
  const foundTasks = await Task.find(filter);

  const tasks = foundTasks.map((doc) => {
    const task = doc.toObject();

    return {
      ...task,
      title: task.title || task.task,
    };
  });

  res.json(tasks);
};

router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const note = req.body.note;
  const listId = req.body.listId;
  const completed = req.body.completed;

  if (listId) {
    try {
      const list = await List.findById(listId);

      const newTask = new Task({
        title,
        note,
        completed,
      });

      const task = await newTask.save();

      const newTasks = list.tasks.concat(task._id);

      await list.update({
        tasks: newTasks,
      });

      return getAllTasks(res, newTasks);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Oops! Something happened!');
    }
  }
  return res.status(400).send('need a list id!');
});

router.route('/:taskId').post((req, res) => {
  const taskId = req.params.taskId;
  const title = req.body.title;
  const note = req.body.note;
  const completed = req.body.completed;

  Task.findByIdAndUpdate(taskId, { title, note, completed })
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
