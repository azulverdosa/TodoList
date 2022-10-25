import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState({ message: '' });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setNewUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(newUser);
  };

  const handlePasswordConfirm = (event) => {
    event.preventDefault();

    const { value } = event.target;
    setPasswordConfirm(value);
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();

    if (
      newUser.name === '' ||
      newUser.email === '' ||
      newUser.password === '' ||
      newUser.confirmPassword
    ) {
      setError({ message: 'Fields cannot be blank' });
    } else if (newUser.name && newUser.email && newUser.password === passwordConfirm) {
      axios
        .post(urlJoin(process.env.REACT_APP_API_URL, 'register'), newUser)
        .then((res) => {
          if (res.status === 200) {
            console.log('REGISTRATION SUCCESS');
            setLoginStatus(true);
          } else {
            console.log('not error but will throw');
            throw res;
          }
        })
        .catch((err) => {
          console.log('error?', err);
        })
        .then((res) => {
          if (res !== 200) {
            setError({ message: 'User already exists' });
          }
        });
    } else {
      console.log('something went wrong', newUser.name, newUser.password, passwordConfirm); //this needs to be chaged - but to waht?
    }
  };

  const newUserTemplate = (
    <div className="ui large form error" style={{ margin: '20px' }}>
      <div className="two fields">
        <form style={{ padding: 30 }}>
          <div className="field">
            <label autoComplete="off">Name</label>
            <input
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="First Name"
              type="text"
            />
          </div>
          <br />
          <div className="field">
            <label autoComplete="off">Email</label>
            <input
              name="email"
              value={newUser.email}
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
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Password"
              type="password"
            />
          </div>
          <br />
          <div className="field">
            <label autoComplete="off">Password</label>
            <input
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handlePasswordConfirm}
              placeholder="Confirm Password"
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
          <button onClick={handleRegisterClick} className="ui submit button">
            Register
          </button>
        </form>
      </div>
    </div>
  );

  console.log('register loginStatus', loginStatus);
  return <div>{loginStatus ? <Navigate replace to="/lists" /> : newUserTemplate}</div>;
};

export default Register;
