const List = require('../models/listModel');
const Task = require('../models/taskModel');

const deleteTasksFromDB = (ids = []) => {
  const filter = ids?.length ? { _id: { $in: ids } } : {};
  try {
    return Task.deleteMany(filter);
  } catch (err) {
    console.error(err);
    throw 'error deleting tasx';
  }
};

const getTasksFromDB = async (ids = []) => {
  const filter = ids?.length ? { _id: { $in: ids } } : {};
  const foundTasks = await Task.find(filter);

  const tasks = foundTasks.map((doc) => {
    const task = doc.toObject();

    return {
      ...task,
      title: task.title || task.task,
    };
  });

  return tasks;
};

const getListsFromDB = (ids = []) => {
  const filter = ids?.length ? { _id: { $in: ids } } : {};

  try {
    return List.find(filter);
  } catch (err) {
    console.error(err);
    throw 'Could not retrieve lists';
  }
};

module.exports = {
  deleteTasksFromDB,
  getListsFromDB,
  getTasksFromDB,
};
