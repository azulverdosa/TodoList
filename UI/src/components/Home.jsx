import React from 'react';
import DeleteItem from './Lists/DeleteItem';
import EditItem from './Lists/EditItem';

const Home = () => {
  return (
    <div style={{ margin: '20px' }}>
      <DeleteItem />
      Mostly just a test
      <EditItem />
    </div>
  );
};

export default Home;
