import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import AddItemForm from './components/Lists/AddItem';
import Home from './components/Home';
import List from './components/Lists/List';
// import LoginForm from './components/LogIn';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/additem" exact element={<AddItemForm />} />
            <Route path="/list" exact element={<List />} />
            {/* <Route path="/login" exact element={<LoginForm />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
