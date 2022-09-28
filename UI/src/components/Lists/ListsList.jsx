import { useState } from 'react';
import AddList from './AddList';
import ListItem from './ListItem';

const Lists = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [lists, setLists] = useState([
    {
      title: '',
      note: '',
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
      <h3>Your Lists</h3>
      <ListItem lists={lists} setLists={setLists} isEditing={isEditing} />
      <AddList setLists={setLists} />
    </div>
  );
};

export default Lists;
