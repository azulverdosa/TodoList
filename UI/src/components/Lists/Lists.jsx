import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import urlJoin from 'url-join';
import axios from 'axios';

import AddList from './AddList';
import ListItem from './ListItem';

const ListsList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    isEditing ||
      axios
        .get(urlJoin(process.env.REACT_APP_API_URL, 'list'))
        .then((res) => {
          if (res.status === 200) {
            setLists(
              res.data.map((list) => ({
                ...list,
                title: list.title,
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
      <h3>Your Lists</h3>

      {lists.map((list) => (
        <ListItem
          key={list._id}
          list={list}
          setLists={setLists}
          isEditing={isEditing}
          updateList={setLists}
        />
      ))}

      <AddList setLists={setLists} />
    </div>
  );
};

export default ListsList;
