const express = require('express');
const router = express.Router();
const List = require('../models/listModel');
const Task = require('../models/taskModel');

const getAllLists = (res) => List.find().then((foundLists) => res.json(foundLists));
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
router.route('/').get((req, res) => {
  getAllLists(res);
});

router.route('/').post((req, res) => {
  const title = req.body.title;
  const note = req.body.note;
  const listId = req.body.listId;

  const newList = new List({
    title,
    note,
    listId,
  });

  newList.save().then(() => {
    getAllLists(res);
  });
});

router.route('/:listId').get(async (req, res) => {
  const listId = req.params.listId;

  if (listId) {
    try {
      const list = await List.findById(listId);

      const tasks = list.tasks;

      return getAllTasks(res, tasks);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Oops! Something happened!');
    }
  }

  return res.status(400).send('need a list id!');
});

router.route('/:listId').post((req, res) => {
  const listId = req.params.listId;
  const list = req.body.list;
  const note = req.body.note;

  List.findByIdAndUpdate(listId, { list: list, note: note }) //I want this to update any changes - or just update all as if one doesn't change it's the same anyway
    .then(() => {
      getAllLists(res);
      console.log('res');
    })
    .catch((err) => {
      console.log(`Failed to update list ${listId}`, err);
      res.sendStatus(500);
    });
  console.log('meow');
});

router.route('/:listId').delete((req, res) => {
  const listId = req.params.listId;

  List.findByIdAndDelete(listId)
    .then(() => {
      getAllLists(res);
    })
    .catch((err) => {
      console.log(`Failed deleteing task ${listId}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
