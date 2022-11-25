import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';

const Profile = ({ user }) => {
  const [loginStatus, setLoginStatus] = useState(true);
  const navigate = useNavigate();
  console.log('user :>> ', user);
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

  console.log('loginStatus :>> ', loginStatus);

  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>Well, hello there 'user Name'!</h1>
      <img
        style={{ margin: '20px' }}
        alt="avatar"
        className="ui avatar image"
        src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png"
      />
      <span style={{ fontWeight: 'bold' }}>Username</span>
      <br />

      <span style={{ marginLeft: '20px' }}>Description</span>
      <br />
      <br />
      <button style={{ marginLeft: '20px' }} className="ui compact floated button">
        Edit Profile
      </button>
      <Link to="/lists">
        <button className="ui compact floated button">Your Todo Lists</button>
      </Link>
      <br />
      <button
        style={{ margin: '20px' }}
        onClick={handleLogout}
        className="ui compact floated button"
      >
        Log Out
      </button>
    </main>
  );
};
export default Profile;
