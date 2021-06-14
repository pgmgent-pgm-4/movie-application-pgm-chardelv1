import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import {
  Link, Route
} from "react-router-dom";

import ThemeToggler from '../theme/ThemeToggler';

import * as Routes from '../../routes';
import { useAuth } from '../../contexts/firebase/auth.context';

import styles from './MainNavigation.module.scss';

const MainNavigation = () => {
  const {currentUser, signOut} = useAuth();
  const [query, setQuery] = useState();
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to={Routes.LANDING} title="Home"><img className={styles.logo} src="/mstile-150x150.png" alt="Home"/></Link>
        </li>
        <li>
          <Link to={Routes.MOVIES}>Movies</Link>
        </li>
        <li>
          <Link to={Routes.TVSHOWS}>TV</Link>
        </li>
        <li>
          <input className={styles.search} type="search" id="search" name="search" value={query} onChange={handleChange}/>
          <Link to={Routes.RESULTS.replace(':query', query)} title="Search"><FiSearch /></Link>
        </li>
        <li>
          {!!currentUser
          ? <button href="#" title="Log Out" onClick={signOut}><img className={styles.user__avatar} src={`https://robohash.org/${currentUser.id}?gravatar=hashed`} alt='User avatar'/>Logout</button>
          : <Link to={Routes.AUTH_SIGN_IN}>Sign In</Link>}
        </li>
        <li>
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;