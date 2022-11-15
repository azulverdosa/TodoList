import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';
import { Button, Modal } from 'semantic-ui-react';

import ModalExampleBasic from './ModalConfirmDelete';
import ModalEmptyFeild from './ModalEmptyFeild';
import Login from './User/Login';

const Home = () => {
  const handleDeleteItem = (id) => {
    axios
      .delete(urlJoin(process.env.REACT_APP_API_URL, 'list', id))
      .then((res) => {
        if (res.status === 200) {
          console.log('deleted!');
        } else {
          throw res;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  };

  return (
    <main style={{ margin: '20px' }}>
      <h1>Welcome to ToDoMatic</h1>
      <h5>Let's get you sorted:</h5>
      <Login />
      {/* <Link to="/login">
        <button className="ui compact left floated button">Login</button>
      </Link> */}
      {/* <Link to="/register">
        <button className="ui compact left floated button">Register</button>
      </Link> */}
      {/* <br />
      <h5>Let's play around a bit:</h5>
      <Button className="ui compact left floated button">Delete</Button>

      <Button className="ui compact left floated button" as="a">
        Save
      </Button>

      <Modal
        trigger={
          <Button className="ui compact left floated button">
            <i className="trash icon" />
          </Button>
        }
        header="DELETE"
        content="Are you sure you want to delete this?"
        actions={['Cancel', { key: 'done', content: 'Yes', positive: true }]}
      />

      <Modal
        trigger={<Button className="ui compact left floated button">Add Item</Button>}
        header="Oops..."
        content="You forgt something, feilds cannot be empty."
        actions={[{ key: 'done', content: 'Ok', positive: true }]}
      />

      <ModalExampleBasic />
      <ModalEmptyFeild /> */}
      <br />
    </main>
  );
};

export default Home;
