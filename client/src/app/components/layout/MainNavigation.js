import {
  Link
} from "react-router-dom";

import * as Routes from '../../routes';

import { useAuth } from '../../contexts/firebase/auth.context';

const MainNavigation = () => {
  const {currentUser, signOut} = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to={Routes.LANDING}>Home</Link>
        </li>
        <li>
          <Link to={Routes.PROJECTS}>Projects</Link>
        </li>
        <li>
          {!!currentUser
          ? <a href="#" onClick={signOut}>Logout</a>
          : <Link to={Routes.AUTH_SIGN_IN}>Sign In</Link>
          }    
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;