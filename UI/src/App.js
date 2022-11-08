import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import List from './components/Lists/TasksList';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Lists from './components/Lists/Lists';
import Profile from './components/User/Profile';
import Protected from './components/User/Protected';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(null);

  const logIn = () => {
    setLoggedInStatus(true);
  };

  const logOut = () => {
    setLoggedInStatus(false);
  };

  return (
    <main>
      <Router>
        <Header />
        {loggedInStatus ? (
          <button onClick={logOut}>Logout</button>
        ) : (
          <button onClick={logIn}>Login</button>
        )}
        <div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/list/:listId" exact element={<List />} />
            <Route path="/lists" exact element={<Lists />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route
              path="/profile"
              exact
              element={
                <Protected loggedInStatus={loggedInStatus}>
                  <Profile />
                </Protected>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
