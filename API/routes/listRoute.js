const express = require('express');
const router = express.Router();
const List = require('../models/listModel');

const getAllLists = (res) => List.find().then((foundLists) => res.json(foundLists));

router.route('/').get((req, res) => {
  getAllLists(res);
});

router.route('/').post((req, res) => {
  const title = req.body.title;
  const note = req.body.note;

  const newList = new List({
    title,
    note,
  });

  newList.save();

  // .then(() => {
  //   getAllLists(res);
  // });
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
