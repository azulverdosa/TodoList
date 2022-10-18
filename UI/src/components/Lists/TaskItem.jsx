import React, { useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

import EditForm from './EditForm';
import ModalConfirmDelete from '../ModalConfirmDelete';
import { useEffect } from 'react';

const TaskItem = ({ task, setTasks, isEditing, updateList }) => {
  const [editOn, setEditOn] = useState(false);

  const confirmDeletePhrase = () => (
    <p>
      Are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{task.title}</span>?
    </p>
  );

  const toggleTaskCompleted = (event) => {
    event.preventDefault();
    axios
      .post(urlJoin(process.env.REACT_APP_API_URL, 'task', task._id), {
        completed: !task.completed,
      })
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

  useEffect(() => {
    if (!isEditing) {
      setEditOn(false);
    }
  }, [isEditing]);

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
        <button onClick={handleEditItem} className="tiny ui compact icon floated button">
          <i className="edit icon" />
        </button>

        <ModalConfirmDelete
          handleDelete={() => {
            handleDeleteItem(task._id);
          }}
          phrase={confirmDeletePhrase}
        />
      </div>
    </>
  );

  const viewTaskTemplate = (
    <div>
      <input type="checkbox" checked={task.completed} onChange={toggleTaskCompleted} />
      <label
        className="header"
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </label>
      <p className="description">{task.note}</p>
    </div>
  );

  return (
    <div id={task._id} style={{ margin: '20px' }}>
      {isEditing ? editTaskTemplate : viewTaskTemplate}{' '}
    </div>
  );
};

export default TaskItem;
