import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const authRole = localStorage.getItem('auth_role');
  const authToken = localStorage.getItem('auth_token');

  if (!authToken) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/Login" />;
  }

  if (role && authRole !== role) {
    // If the user's role does not match the required role, redirect to an unauthorized page or home page
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the correct role, render the children components
  return children;
};

export default PrivateRoute;
