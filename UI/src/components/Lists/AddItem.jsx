import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import urlJoin from 'url-join';

const AddItemForm = () => {
  const [tasks, setTasks] = useState({
    task: '',
    note: '',
    // completed: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTasks((prevTasks) => {
      return {
        ...prevTasks,
        [name]: value,
      };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();

    // const newTask = {
    //   task: tasks.task,
    //   note: tasks.note,
    // };

    const newTask = {
      id: `todo-${nanoid()}`,
      task: tasks.task,
      note: tasks.note,
      completed: false,
    };

    axios
      .post(urlJoin(process.env.REACT_APP_API_URL, 'additem'), newTask)
      .then((req) => {
        if (req) {
          console.log('success', newTask);
        } else {
          throw req;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  };

  return (
    <form className="ui form" style={{ margin: '20px' }}>
      Just to see changes in AddItemForm
      <div className="field">
        <h3>What needs doing?</h3>
        <input
          onChange={handleChange}
          type="text"
          name="task"
          value={tasks.taskName}
          placeholder="Task name"
          autoComplete="off"
        />
      </div>
      <div className="field">
        <textarea
          onChange={handleChange}
          rows="2"
          name="note"
          value={tasks.taskNote}
          placeholder="Add a note..."
          autoComplete="off"
        ></textarea>
      </div>
      <button onClick={handleClick} className="ui button" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default AddItemForm;
