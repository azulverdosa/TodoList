import axios from 'axios';
import React, { useState } from 'react';
import urlJoin from 'url-join';

const AddList = () => {
  const [newList, setNewList] = useState([
    {
      title: '',
      note: '',
    },
  ]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewList((prevLists) => {
      return { ...prevLists, [name]: value };
    });
  };
  console.log(newList);

  const handleAddList = (event) => {
    event.preventDefault();

    axios.post(urlJoin(process.env.REACT_APP_API_URL, 'list'), {
      title: newList.title,
      note: newList.note,
    });
    // .then((res) => {
    //
    // })
  };

  return (
    <div>
      <div style={{ margin: '20px' }}>
        <h3>These are your lists:</h3>
      </div>

      <form className="ui form" style={{ margin: '20px' }}>
        <div className="field">
          <input
            onChange={handleInputChange}
            type="text"
            name="title"
            value={newList.title}
            placeholder="List name"
            autoComplete="off"
          />
        </div>
        <div className="field">
          <textarea
            onChange={handleInputChange}
            rows="2"
            name="note"
            value={newList.note}
            placeholder="Add a note..."
            autoComplete="off"
          ></textarea>
        </div>

        <button onClick={handleAddList} className="ui button">
          Add List
        </button>
      </form>
    </div>
  );
};

export default AddList;