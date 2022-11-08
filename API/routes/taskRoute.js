const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Task = require('../models/taskModel');
const List = require('../models/listModel');

const { addNewTask, editTask, deleteTask } = require('../controllers/taskControllers');

router.route('/').post(addNewTask);

router.route('/:taskId').post(editTask).delete(deleteTask);

module.exports = router;
