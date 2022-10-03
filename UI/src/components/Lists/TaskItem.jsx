import React, { useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import { nanoid } from 'nanoid';

import EditForm from '../EditForm';

const TaskItem = ({ task, setTasks, isEditing, updateList }) => {
  const [editOn, setEditOn] = useState(false);

  const toggleTaskCompleted = () => {
    // should axios post like in edit form
    // and update list with updateList
  };

  const handleDeleteItem = () => {
    axios
      .delete(urlJoin(process.env.REACT_APP_API_URL, 'task', task._id))
      .then((res) => {
        if (res.status === 200) {
          updateList(res.data);
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  };

  const handleEditItem = () => {
    setEditOn(!editOn);
  };

  const editTaskTemplate = editOn ? (
    <EditForm
      item={task}
      setItems={setTasks}
      exitEditForm={handleEditItem}
      updateList={updateList}
    />
  ) : (
    <>
      <label>{task.title}</label>
      <p>{task.note}</p>
      <div>
        <button onClick={handleEditItem} className="ui compact icon floated button">
          <i className="edit icon" />
        </button>
        <button
          onClick={() => {
            handleDeleteItem();
          }}
          className="ui compact icon floated button"
        >
          <i className="trash icon" />
        </button>
      </div>
    </>
  );

  const viewTaskTemplate = (
    <div>
      <input
        id={task._id}
        type="checkbox"
        defaultChecked={task.completed}
        onChange={toggleTaskCompleted}
      />
      <label className="header"> {task.title}</label>
      <p className="description">{task.note}</p>
    </div>
  );

  return <div style={{ margin: '20px' }}>{isEditing ? editTaskTemplate : viewTaskTemplate} </div>;
};

export default TaskItem;
