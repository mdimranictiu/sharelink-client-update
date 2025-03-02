import React, { useContext } from 'react';
import { Navigate,  } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);


  // Show spinner while loading
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-ring loading-lg text-primary"></span>
          <span className="loading loading-ring loading-lg text-secondary"></span>
          <span className="loading loading-ring loading-lg text-accent"></span>
          <span className="loading loading-ring loading-lg text-neutral"></span>
          <span className="loading loading-ring loading-lg text-info"></span>
          <span className="loading loading-ring loading-lg text-success"></span>
          <span className="loading loading-ring loading-lg text-warning"></span>
          <span className="loading loading-ring loading-lg text-error"></span>
        </div>
      </>

    );
  }

  if (user) {
    return children;
  }


  return <Navigate to="/" />;
};

export default PrivateRoute;
