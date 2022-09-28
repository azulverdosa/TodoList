import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskItem from './Task';

const listName = 'This will be the LIST NAME';

const List = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([
    {
      task: '',
      note: '',
      completed: false,
    },
  ]);

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
      <TaskItem tasks={tasks} setTasks={setTasks} isEditing={isEditing} />
      <AddTask setTasks={setTasks} />
    </div>
  );
};

export default List;
