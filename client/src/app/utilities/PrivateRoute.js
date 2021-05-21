import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import * as Routes from './routes';

import { useAuth } from "../contexts/firebase";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useAuth();
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={Routes.AUTH_SIGN_IN} />
        )
      }
    />
  );
};

export default PrivateRoute;