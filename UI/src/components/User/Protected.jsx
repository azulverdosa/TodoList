import { Navigate } from 'react-router-dom';

const Protected = ({ loggedInStatus, children }) => {
  if (!loggedInStatus) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
