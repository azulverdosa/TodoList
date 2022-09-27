import React, { useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

const Login = () => {
  const [login, setLogin] = useState({
    name: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const [error, setError] = useState({ message: '' });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(login);
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    if (login.name === '' || login.password === '') {
      setError({ message: 'Feilds cannot be blank' });
    }
    setLoginStatus(true);
  };

  return (
    <div className="ui large form error" style={{ margin: '20px' }}>
      <div className="two fields">
        <form style={{ padding: 30 }}>
          <div className="field">
            <label autoComplete="off">Name</label>
            <input
              name="name"
              value={login.name}
              onChange={handleInputChange}
              placeholder="Name"
              type="text"
            />
          </div>
          <br />
          <div className="field">
            <label autoComplete="off">Password</label>
            <input
              name="password"
              value={login.password}
              onChange={handleInputChange}
              placeholder="Password"
              type="password"
            />
          </div>
          <br />
          <div>
            <div className="ui error message">
              {error.message && <div className="header">{error.message}</div>}
            </div>
          </div>
          <br />
          <button onClick={handleLoginClick} className="ui submit button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
