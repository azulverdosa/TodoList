import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';

import EditForm from './EditForm';
import ModalConfirmDelete from '../Modal';

const ListItem = ({ list, setLists, isEditing, updateList }) => {
  const [editOn, setEditOn] = useState(false);

  const confirmDeletePhrase = () => (
    <p>
      Are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{list.title}</span>?
    </p>
  );

  const handleDeleteItem = (id) => {
    axios
      .delete(urlJoin(process.env.REACT_APP_API_URL, 'list', id))
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
      <label style={{ fontWeight: 'bold' }}>{list.title}</label>
      <p>{list.note}</p>
      <div>
        <button
          onClick={() => {
            handleEditItem(list._id);
          }}
          className="tiny ui compact icon floated button"
        >
          <i className="edit icon" />
        </button>
        <ModalConfirmDelete
          handleDelete={() => {
            handleDeleteItem(list._id);
          }}
          phrase={confirmDeletePhrase}
        />
      </div>
    </>
  );

  const viewListTemplate = (
    <div>
      <div className="ui list">
        <div className="item">
          <Link to={`/list/${list._id}`}>
            <h5 className="header">{list.title}</h5>
          </Link>
          <p className="description">{list.note}</p>
        </div>
      </div>
    </div>
  );

  return <div style={{ margin: '20px' }}>{isEditing ? editListTemplate : viewListTemplate}</div>;
};

export default ListItem;
