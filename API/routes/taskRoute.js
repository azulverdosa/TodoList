const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Task = require('../models/taskModel');
const List = require('../models/listModel');

const { addNewTask, editTask, deleteTask } = require('../controllers/taskControllers');
const verifyJWT = require('../middlewares/verifyJWT');

router.route('/').post(verifyJWT, addNewTask);

router.route('/:taskId').post(verifyJWT, editTask).delete(verifyJWT, deleteTask);

module.exports = router;
