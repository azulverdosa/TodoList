import React, { useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

const AddTask = ({ setTasks, listId }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    note: '',
    completed: false,
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewTask((prevTasks) => {
      return {
        ...prevTasks,
        [name]: value,
      };
    });
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    axios
      .post(urlJoin(process.env.REACT_APP_API_URL, 'task'), {
        title: newTask.title,
        note: newTask.note,
        listId: listId,
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

    setNewTask({ title: '', note: '' });
  };

  return (
    <form className="ui form" style={{ margin: '20px' }}>
      <div className="field">
        <h3>What needs doing?</h3>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          value={newTask.title}
          placeholder="Task name"
          autoComplete="off"
        />
      </div>
      <div className="field">
        <textarea
          onChange={handleChange}
          rows="2"
          name="note"
          value={newTask.note}
          placeholder="Add a note..."
          autoComplete="off"
        ></textarea>
      </div>
      <button onClick={handleAddTask} className="ui button">
        Add Task
      </button>
      {/* {listId} */}
    </form>
  );
};

export default AddTask;
