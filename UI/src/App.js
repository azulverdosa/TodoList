import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import List from './components/Lists/TasksList';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Lists from './components/Lists/Lists';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/list/:listId" exact element={<List />} />
            <Route path="/lists" exact element={<Lists />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
