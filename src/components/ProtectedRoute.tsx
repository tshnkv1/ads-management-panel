import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AUTH } from '../constants';
/* eslint-disable @typescript-eslint/no-explicit-any */

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [checkedAuth, setCheckedAuth] = useState(false);
  
    useEffect(() => {
      if (!checkedAuth) {
        const password = prompt('Enter password:');
        if (password === AUTH.PASSWORD) {
          setIsAuthorized(true);
        }
        setCheckedAuth(true);
      }
    }, [checkedAuth]);
  
    if (!checkedAuth) {
      return null;
    }
  
    return isAuthorized ? (
      <Route {...rest} render={(props) => <Component {...props} />} />
    ) : (
      <Redirect to="/error" />
    );
  };
  
  export default ProtectedRoute;
  