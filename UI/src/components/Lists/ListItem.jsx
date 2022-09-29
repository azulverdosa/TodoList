import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import { nanoid } from 'nanoid';
import EditForm from '../EditForm';

const ListItem = ({ lists, setLists, isEditing }) => {
  const [editOn, setEditOn] = useState(false);

  useEffect(() => {
    axios
      .get(urlJoin(process.env.REACT_APP_API_URL, 'lists'))
      .then((res) => {
        if (res.status === 200) {
          setLists(res.data);
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  }, []);

  const handleDeleteItem = (id) => {
    axios
      .delete(urlJoin(process.env.REACT_APP_API_URL, 'lists', id))
      .then((res) => {
        if (res.status === 200) {
          setLists(res.data);
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

    console.log(id);
  };

  const editListTemplate = (
    <div>
      {lists.map((list) => (
        <ul key={nanoid(10)}>
          <div>
            {editOn ? (
              <EditForm
                id={list._id}
                name={list.title}
                note={list.note}
                lists={lists}
                setLists={setLists}
                handleEditItem={handleEditItem}
              />
            ) : (
              <>
                <label>{list.title}</label>
                <p>{list.note}</p>
              </>
            )}
          </div>
          <div>
            {!editOn && (
              <button
                onClick={() => {
                  handleEditItem(list._id);
                }}
                className="ui compact icon floated button"
              >
                <i className="edit icon" />
              </button>
            )}
            {!editOn && (
              <button
                onClick={() => {
                  handleDeleteItem(list._id);
                }}
                className="ui compact icon floated button"
              >
                <i className="trash icon" />
              </button>
            )}
          </div>
        </ul>
      ))}
    </div>
  );

  const viewListTemplate = (
    <div style={{ margin: '20px' }}>
      {lists.map((list) => (
        <div className="ui list">
          <div className="item">
            <div className="header">{list.title}</div>
            <div className="description">{list.note}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return <div> {isEditing ? editListTemplate : viewListTemplate}</div>;
};

export default ListItem;
