import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

const TaskItem = () => {
  const [tasks, setTasks] = useState([
    {
      task: '',
      note: '',
    },
  ]);

  const deleteTask = (task) => {
    const taskID = task._id;
    // axios.delete(urlJoin(process.env.REACT_APP_API_URL, `list/${taskID}`));
    console.log(taskID);
  };

  const editTask = () => {};

  useEffect(() => {
    axios
      .get(urlJoin(process.env.REACT_APP_API_URL, 'list'))
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
            <button onClick={deleteTask(task)} className="ui compact icon floated button">
              <i className="edit icon" />
            </button>
            <button className="ui compact icon floated button">
              <i className="trash icon" />
            </button>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default TaskItem;
