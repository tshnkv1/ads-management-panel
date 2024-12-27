import { FC, useState, useEffect} from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { AUTH } from '../constants';
import { PUBLIC_ROUTES } from '../routes/routes';

interface IProtectedRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ComponentType<object>;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ component: Component, ...rest }): JSX.Element | null => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [checkedAuth, setCheckedAuth] = useState<boolean>(false);
  
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
      <Redirect to={PUBLIC_ROUTES.ERROR} />
    );
  };
  
  export default ProtectedRoute;
  