const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Task = require('../models/taskModel');
const List = require('../models/listModel');

const { getListsFromDB, getTasksFromDB } = require('../helpers/databaseHelpers');

router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const note = req.body.note;
  const listId = req.body.listId;
  const completed = req.body.completed;

  if (listId) {
    try {
      const lists = await getListsFromDB(listId);

      if (lists?.length) {
        const list = lists?.[0];

        const newTask = new Task({
          title,
          note,
          completed,
        });

        const task = await newTask.save();

        const newTasks = list.tasks.concat(task._id);

        await list.updateOne({
          tasks: newTasks,
        });

        const allTasks = await getTasksFromDB(newTasks);

        return res.json(allTasks);
      }

      res.status(400).send('No list found with that ID');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Oops! Something happened!');
    }
  }
  return res.status(400).send('need a list id!');
});

router.route('/:taskId').post(async (req, res) => {
  const taskId = req.params.taskId;
  const title = req.body.title;
  const note = req.body.note;
  const completed = req.body.completed;

  const foundLists = await List.find({ tasks: mongoose.Types.ObjectId(taskId) });
  // console.log('foundLists :>> ', foundLists);

  if (foundLists?.length) {
    const mongoList = foundLists?.[0];
    // console.log('mongoList :>> ', mongoList);

    const listTasks = mongoList.toObject().tasks;
    // console.log('listTasks :>> ', listTasks);

    return Task.findByIdAndUpdate(taskId, { title, note, completed })
      .then(async () => {
        try {
          if (listTasks.length) {
            const allTasks = await getTasksFromDB(listTasks);
            // console.log('allTasks :>> ', allTasks);

            return res.json(allTasks);
          }
          return res.send([]);
        } catch (err) {
          console.error(err);

          return res.status(500).send('Oops! Something happened!');
        }
      })
      .catch((err) => {
        console.log(`Failed to update task ${taskId}`, err);
        res.sendStatus(500);
      });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const taskId = req.params.taskId;

  const foundLists = await List.find({ tasks: mongoose.Types.ObjectId(taskId) });

  if (foundLists?.length) {
    const mongoList = foundLists?.[0];

    const leftoverTasks = mongoList.toObject().tasks.filter((task) => {
      return task.toString() !== taskId;
    });

    await mongoList.updateOne({ tasks: leftoverTasks });

    return Task.findByIdAndDelete(taskId)
      .then(async () => {
        try {
          if (leftoverTasks.length) {
            const allTasks = await getTasksFromDB(leftoverTasks);

            return res.json(allTasks);
          }

          return res.send([]);
        } catch (err) {
          console.error(err);

          return res.status(500).send('Oops! Something happened!');
        }
      })
      .catch((err) => {
        console.log(`Failed deleting task ${taskId}`, err);
        res.sendStatus(500);
      });
  }
});

module.exports = router;
