import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

const TaskItem = () => {
  const [tasks, setTasks] = useState([
    {
      id: '',
      task: '',
      note: '',
      completed: false,
    },
  ]);

  // const taskID = (task) => {
  //   const taskID = task._id;
  //   console.log(taskID);
  // };

  const handleDelete = (id) => {
    // const remainingTasks = tasks.filter((task) => id !== task._id);
    // alert('are you sure');
    axios
      .delete(urlJoin(process.env.REACT_APP_API_URL, 'task', id))
      .then((res) => {
        if (res.status !== 200) {
          console.log(tasks);
          // setTasks(remainingTasks);
        } else {
          throw res.status;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  };

  const handleEdit = (id) => {
    tasks.find((task) => id === task._id && console.log(task));
  };

  useEffect(() => {
    axios
      .get(urlJoin(process.env.REACT_APP_API_URL, 'task'))
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
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <ul key={task.task}>
          <div>
            <input type="checkbox" />
            <label>{task.task}</label>
          </div>
          <p>{task.note}</p>
          <div>
            <button
              onClick={() => {
                handleEdit(task._id);
              }}
              className="ui compact icon floated button"
            >
              <i className="edit icon" />
            </button>
            <button
              onClick={() => {
                handleDelete(task._id);
              }}
              className="ui compact icon floated button"
            >
              <i className="trash icon" />
            </button>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default TaskItem;
