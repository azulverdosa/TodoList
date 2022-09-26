import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import { nanoid } from 'nanoid';

const TaskItem = ({ tasks, setTasks }) => {
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

  const handleDelete = (id) => {
    axios
      .delete(urlJoin(process.env.REACT_APP_API_URL, 'task', id))
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

  const handleEditItem = (id) => {
    tasks.find((task) => id === task._id && console.log(task));
  };

  return (
    <div>
      {tasks.map((task) => (
        <ul key={nanoid(10)}>
          <div>
            <input type="checkbox" />
            <label>{task.task}</label>
          </div>
          <p>{task.note}</p>
          <div>
            <button
              onClick={() => {
                handleEditItem(task._id);
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
