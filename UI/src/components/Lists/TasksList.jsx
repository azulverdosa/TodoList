import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';

import AddTask from './AddTask';
import TaskItem from './TaskItem';

const listName = 'My Shopping List';

const TasksList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { listId } = useParams();

  useEffect(() => {
    isEditing ||
      axios
        .get(urlJoin(process.env.REACT_APP_API_URL, 'list', listId))
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setTasks(res.data);
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
          key={task._id}
          task={task}
          isEditing={isEditing}
          setTasks={setTasks}
          updateList={setTasks}
        />
      ))}

      <AddTask setTasks={setTasks} listId={listId} />
    </div>
  );
};

export default TasksList;
