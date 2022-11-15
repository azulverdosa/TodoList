import { useState, useEffect } from 'react';
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
        .get(urlJoin(process.env.REACT_APP_API_URL, 'list'), { withCredentials: true })
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
        className="ui vertical animated right floated button"
        tabIndex="0"
      >
        <div className="visible content">
          <i className="edit icon" />
        </div>
        <div className="hidden content">Edit</div>
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
