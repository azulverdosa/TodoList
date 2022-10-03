import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import { nanoid } from 'nanoid';

import EditForm from '../EditForm';

const ListItem = ({ list, setLists, isEditing, updateList }) => {
  const [editOn, setEditOn] = useState(false);

  const handleDeleteItem = (id) => {
    axios
      .delete(urlJoin(process.env.REACT_APP_API_URL, 'lists', id))
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

  const handleEditItem = (id) => {
    setEditOn(!editOn);
  };

  const editListTemplate = editOn ? (
    <EditForm
      item={list}
      setLists={setLists}
      exitEditForm={handleEditItem}
      updateList={updateList}
    />
  ) : (
    <>
      <label>{list.title}</label>
      <p>{list.note}</p>
      <div>
        <button
          onClick={() => {
            handleEditItem(list._id);
          }}
          className="ui compact icon floated button"
        >
          <i className="edit icon" />
        </button>

        <button
          onClick={() => {
            handleDeleteItem(list._id);
          }}
          className="ui compact icon floated button"
        >
          <i className="trash icon" />
        </button>
      </div>
    </>
  );

  const viewListTemplate = (
    <div>
      <div className="ui list">
        <div className="item">
          <h5 className="header">{list.title}</h5>
          <p className="description">{list.note}</p>
        </div>
      </div>
    </div>
  );

  return <div style={{ margin: '20px' }}> {isEditing ? editListTemplate : viewListTemplate}</div>;
};

export default ListItem;
