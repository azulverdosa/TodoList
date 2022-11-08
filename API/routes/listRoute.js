const express = require('express');
const router = express.Router();

const List = require('../models/listModel');

const {
  getAllLists,
  addNewList,
  getList,
  editList,
  deleteList,
} = require('../controllers/listControllers');

router.route('/').get(getAllLists).post(addNewList);

router.route('/:listId').get(getList).post(editList).delete(deleteList);

module.exports = router;
