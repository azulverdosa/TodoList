import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import { nanoid } from 'nanoid';

import AddTask from './AddTask';
import TaskItem from './TaskItem';

const listName = 'My Shopping List';

// {
//   title: '',
//   note: '',
//   completed: false,
// },

const List = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    isEditing ||
      axios
        .get(urlJoin(process.env.REACT_APP_API_URL, 'task'))
        .then((res) => {
          if (res.status === 200) {
            setTasks(
              res.data.map((task) => ({
                ...task,
                title: task.title || task.task,
              }))
            );
          } else {
            throw res;
          }
        })
        .catch((err) => {
          console.log('error?', err);
        });
  }, [isEditing]);

  return (
    <div style={{ margin: '20px' }}>
      <button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
        className="ui icon right floated button"
      >
        <i className="edit icon" />
      </button>
      <h3>{listName}</h3>

      {tasks.map((task) => (
        <TaskItem
          key={nanoid(10)}
          isEditing={isEditing}
          setTasks={setTasks}
          task={task}
          updateList={setTasks}
        />
      ))}

      <AddTask setTasks={setTasks} />
    </div>
  );
};

export default List;
