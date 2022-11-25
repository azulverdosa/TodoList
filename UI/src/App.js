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
import { AuthContextProvider } from './helpers/useAuthContext';

const App = () => {
  const [loginStatus, setLoginStatus] = useState(null);

  const setLogIn = () => {
    setLoginStatus(true);
  };

  const setLogOut = () => {
    setLoginStatus(false);
  };

  return (
    <main>
      <Router>
        <AuthContextProvider>
          <Header
            setLogIn={setLogIn}
            setLogOut={setLogOut}
            loggedInStatus={loginStatus}
            setLoggedInStatus={setLoginStatus}
          />

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
                  <Protected loggedInStatus={loginStatus}>
                    <Profile />
                  </Protected>
                }
              />
            </Routes>
          </div>
          <Footer />
        </AuthContextProvider>
      </Router>
    </main>
  );
};

export default App;
