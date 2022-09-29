import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <h2 className="ui block header">
      <Link to="/login">
        <button className="ui compact right floated button">Login</button>
      </Link>
      <Link to="/register">
        <button className="ui compact right floated button">Register</button>
      </Link>
      <Link to="/">
        <button className="ui compact right floated button">Home</button>
      </Link>
      <Link to="/list/:id">
        <button className="ui compact right floated button">A List</button>
      </Link>

      <Link to="/lists">
        <button className="ui compact right floated button">Your Lists</button>
      </Link>

      <i className="list ul icon"></i>
      <div className="content">
        TodoMatic
        <div className="sub header">Manage all your ideas, tasks and something something!</div>
      </div>
    </h2>
  );
};

export default Header;
