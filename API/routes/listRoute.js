const express = require('express');
const router = express.Router();

const List = require('../models/listModel');
const verifyJWT = require('../middlewares/verifyJWT');

const {
  getAllLists,
  addNewList,
  getList,
  editList,
  deleteList,
} = require('../controllers/listControllers');

router.route('/').get(verifyJWT, getAllLists).post(verifyJWT, addNewList);

router
  .route('/:listId')
  .get(verifyJWT, getList)
  .post(verifyJWT, editList)
  .delete(verifyJWT, deleteList);

module.exports = router;
