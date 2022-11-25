import React, { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import urlJoin from 'url-join';

import { useAuthContext } from '../../helpers/useAuthContext';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [error, setError] = useState({ message: '' });

  const { axiosWithAuth } = useAuthContext(); //

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setLoginInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLoginClick = (event) => {
    event.preventDefault();

    if (loginInfo.email === '' || loginInfo.password === '') {
      setError({ message: 'Fields cannot be blank' });
    } else if (loginInfo.email && loginInfo.password) {
      axiosWithAuth
        .post(urlJoin(process.env.REACT_APP_API_URL, 'auth'), loginInfo)
        .then((res) => {
          console.log('res :>> ', res);
          // if (res.status === 200) {
          //   setLoginStatus(true);
          //   setLoggedInUser(res.data.payload.userId);
          // } else {
          //   throw res;
          // }
        })
        .catch((err) => {
          console.log('error :>> ', err);
        });
    }
  };

  const loggedOutTemplate = (
    <main className="ui large form error" style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: 0 }}>Sign in </h3>
      <div style={{ margin: '0px 20px 20px 0px' }} className="two fields">
        <form style={{ padding: '0px 10px 10px 10px' }}>
          <br />
          <div className="field">
            <label autoComplete="off">Email</label>
            <input
              name="email"
              value={loginInfo.email}
              onChange={handleInputChange}
              placeholder="Email"
              type="text"
            />
          </div>
          <br />
          <div className="field">
            <label autoComplete="off">Password</label>
            <input
              name="password"
              value={loginInfo.password}
              onChange={handleInputChange}
              placeholder="Password"
              type="password"
            />
          </div>

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
      <p>
        Need an account? <br />
        <Link to="/register">
          <span>Register Here</span>
        </Link>
      </p>
    </main>
  );

  return (
    <div>
      {loginStatus ? <Navigate replace to="/profile" user={loggedInUser} /> : loggedOutTemplate}
    </div>
  );
};

export default Login;
