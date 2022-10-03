import React from 'react';
import { Link } from 'react-router-dom';

import EditForm from './EditForm';

const Home = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h5>You look like you might need to do something, let us help you with that 😉</h5>
      <h5>But first, let's get you sorted:</h5>
      <Link to="/login">
        <button className="ui compact left floated button">Login</button>
      </Link>
      <Link to="/register">
        <button className="ui compact left floated button">Register</button>
      </Link>
      <br />
      <h5>Let's play around a bit:</h5>
      <br />
    </div>
  );
};

export default Home;
