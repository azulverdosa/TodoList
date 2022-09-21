import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import AddItemForm from './AddItem';
import TaskItem from './Task';

const listName = 'This will be the LIST NAME';

const List = () => {
  const editList = () => {};

  return (
    <div style={{ margin: '20px' }}>
      <button onClick={editList} className="ui icon right floated button">
        <i className="edit icon" />
      </button>
      <h3>{listName}</h3>
      <TaskItem />
      <AddItemForm />
    </div>
  );
};

export default List;
