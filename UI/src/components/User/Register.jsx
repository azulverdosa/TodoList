import React from 'react';

const Login = () => {
  return (
    <div className="ui large form error" style={{ margin: '20px' }}>
      <div className="two fields">
        <form style={{ padding: 30 }}>
          <div className="field">
            <label autoComplete="off">Name</label>
            <input type="text" name="first-name" placeholder="First Name" />
          </div>
          <br />
          <div className="field">
            <label autoComplete="off">Password</label>
            <input type="password" />
          </div>
          <br />
          <div className="field">
            <label autoComplete="off">Password</label>
            <input type="password" />
          </div>
          <br />
          {/* <div>
            <div className="ui error message">
              {error.message && <div className="header">{error.message}</div>}
            </div> */}
          <button className="ui submit button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
