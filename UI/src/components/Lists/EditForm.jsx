import { useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

const EditForm = ({ item, setItems, type, exitEditForm, updateList }) => {
  const [newItem, setNewItem] = useState(item);

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setNewItem((prevTasks) => {
      return {
        ...prevTasks,
        [name]: value,
      };
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    axios
      .post(urlJoin(process.env.REACT_APP_API_URL, 'task', item._id), {
        title: newItem.title,
        note: newItem.note,
      })
      .then((res) => {
        if (res.status === 200) {
          exitEditForm();
          updateList(res.data);
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    exitEditForm();
  };

  return (
    <form className="ui form" style={{ margin: '20px' }}>
      <div className="field">
        <input onChange={handleChange} name="title" value={newItem.title} />
      </div>
      <div className="field">
        <textarea value={newItem.note} name="note" onChange={handleChange} rows="2"></textarea>
      </div>
      <button onClick={handleEditSubmit} className="ui compact button">
        Save
      </button>
      <button className="ui compact button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
