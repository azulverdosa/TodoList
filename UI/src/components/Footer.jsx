import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <h2 className="ui block header">
      <div className="content">
        TodoMatic...
        <div className="sub header">What did you think?</div>
      </div>
      <button className="mini ui compact right floated button" style={{ marginTop: '27px' }}>
        Meh...
      </button>
      <button className="mini ui compact right floated button" style={{ marginTop: '27px' }}>
        Ok
      </button>
      <button className="mini ui compact right floated button" style={{ marginTop: '27px' }}>
        Great!
      </button>
      <footer>{`Copyright © Upbeat Code ${year}`}</footer>;
    </h2>
  );
};

export default Footer;
