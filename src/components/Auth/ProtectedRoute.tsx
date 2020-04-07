import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../enum/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { UserState } from '../../redux/modules/user/reducer';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userState: UserState = useSelector((state: RootState) => state.user);
  const isUserLoggedIn = !!userState.token;

  return (
    <Route
      {...rest}
      render={props =>
        isUserLoggedIn ? <Component {...props} /> : <Redirect to={FRONTEND_ROUTES.ADMIN.LOGIN} />
      }
    />
  );
};

export default ProtectedRoute;
