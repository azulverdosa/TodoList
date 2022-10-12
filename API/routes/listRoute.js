const express = require('express');
const router = express.Router();

const List = require('../models/listModel');

const { deleteTasksFromDB, getListsFromDB, getTasksFromDB } = require('../helpers/databaseHelpers');

router.route('/').get(async (req, res) => {
  try {
    const lists = await getListsFromDB();
    return res.json(lists);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Oops! Something happened!');
  }
});

router.route('/').post((req, res) => {
  const title = req.body.title;
  const note = req.body.note;

  const newList = new List({
    note,
    tasks: [],
    title,
  });

  newList.save().then(async () => {
    try {
      const lists = await getListsFromDB();

      return res.json(lists);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Oops! Something happened!');
    }
  });
});

router.route('/:listId').get(async (req, res) => {
  const listId = req.params.listId;

  if (listId) {
    try {
      const lists = await getListsFromDB(listId);

      if (lists?.length) {
        const taskIds = lists?.[0]?.tasks;

        if (taskIds.length) {
          const tasks = await getTasksFromDB(taskIds);
          return res.json(tasks);
        }

        return res.send([]);
      }

      return res.sendStatus(400).send('No list found with that ID');
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

  List.findByIdAndUpdate(listId, { list: list, note: note })
    .then(async () => {
      try {
        const lists = await getListsFromDB();
        return res.json(lists);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Oops! Something happened!');
      }
    })
    .catch((err) => {
      console.log(`Failed to update list ${listId}`, err);
      res.sendStatus(500);
    });
});

router.route('/:listId').delete(async (req, res) => {
  const listId = req.params.listId;

  if (listId) {
    try {
      const list = await List.findById(listId);
      const tasks = list.tasks;

      tasks.length && (await deleteTasksFromDB(tasks));

      return List.findByIdAndDelete(listId)
        .then(async () => {
          try {
            const lists = await getListsFromDB();
            return res.json(lists);
          } catch (err) {
            console.error(err);
            return res.status(500).send('Oops! Something happened!');
          }
        })
        .catch((err) => {
          console.log(`Failed deleteing task ${listId}`, err);
          res.sendStatus(500);
        });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Oops! Something happened!');
    }
  }

  return res.status(400).send('need a list id!');
});

module.exports = router;
