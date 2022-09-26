import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import urlJoin from 'url-join';

const AddItemForm = ({ setTasks }) => {
  const [newTask, setNewTask] = useState({
    task: '',
    note: '',
    // completed: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTasks) => {
      return {
        ...prevTasks,
        [name]: value,
      };
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();

    axios
      .post(urlJoin(process.env.REACT_APP_API_URL, 'additem'), {
        task: newTask.task,
        note: newTask.note,
        completed: false,
      })
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  };

  return (
    <form className="ui form" style={{ margin: '20px' }}>
      <div className="field">
        <h3>What needs doing?</h3>
        <input
          onChange={handleChange}
          type="text"
          name="task"
          value={newTask.taskName}
          placeholder="Task name"
          autoComplete="off"
        />
      </div>
      <div className="field">
        <textarea
          onChange={handleChange}
          rows="2"
          name="note"
          value={newTask.taskNote}
          placeholder="Add a note..."
          autoComplete="off"
        ></textarea>
      </div>
      <button onClick={handleAdd} className="ui button">
        Add Task
      </button>
    </form>
  );
};

export default AddItemForm;
