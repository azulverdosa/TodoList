import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';

import AddTask from './AddTask';
import TaskItem from './TaskItem';

const TasksList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { listId } = useParams();

  const listName = listId;

  useEffect(() => {
    isEditing ||
      axios
        .get(urlJoin(process.env.REACT_APP_API_URL, 'list', listId))
        .then((res) => {
          if (res.status === 200 && res.data) {
            console.log('res.data :>> ', res.data);
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
        className="ui vertical animated right floated button"
        tabIndex="0"
      >
        <div className="visible content">
          <i className="edit icon" />
        </div>
        <div className="hidden content">Edit</div>
      </button>

      <button className="ui vertical animated right floated button" tabIndex="0">
        <div className="visible content">
          <i className="check square outline icon" />
        </div>
        <div className="hidden content">Done</div>
      </button>

      <button className="ui vertical animated right floated button" tabIndex="0">
        <div className="visible content">
          <i className="list ul icon" />
        </div>
        <div className="hidden content">To Do</div>
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
