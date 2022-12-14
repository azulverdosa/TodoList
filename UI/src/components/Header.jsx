import axios from 'axios';
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';

const Header = ({ setLogIn, setLogOut, loggedInStatus, setLoginStatus }) => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    axios
      .get(urlJoin(process.env.REACT_APP_API_URL, 'logout'), { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          console.log('logged Out');
          setLoginStatus(false);
          console.log('res.data :>> ', res.data);
          navigate('/');
        } else {
          console.log('not error but will throw');
          throw res;
        }
      })
      .catch((err) => {
        console.log('error?', err);
      });
  };

  return (
    <h2 className="ui block header">
      {/* <button onClick={handleLogout} className="ui compact right floated button">
        Log Out
      </button> */}
      {loggedInStatus ? (
        <button onClick={setLogOut} className="ui compact right floated button">
          Logout
        </button>
      ) : (
        <button onClick={setLogIn} className="ui compact right floated button">
          Login
        </button>
      )}
      {/* <Link to="/login">
        <button className="ui compact right floated button">Login</button>
      </Link> */}
      {/* <Link to="/register">
        <button className="ui compact right floated button">Register</button>
      </Link> */}
      <Link to="/">
        <button className="ui compact right floated button">Home</button>
      </Link>
      {loggedInStatus && (
        <Link to="/lists">
          <button className="ui compact right floated button">Your Lists</button>
        </Link>
      )}
      {loggedInStatus && (
        <Link to="/profile">
          <button className="ui compact right floated button">Profile</button>
        </Link>
      )}
      <i className="list ul icon"></i>
      <div className="content">
        TodoMatic
        <div className="sub header">Manage all your ideas, tasks and something something!</div>
      </div>
    </h2>
  );
};

export default Header;
