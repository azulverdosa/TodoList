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

module.exports = router;
