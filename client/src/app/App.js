import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider, FirebaseProvider } from './contexts/firebase';

import * as Routes from './routes';

import styles from './App.module.scss';
import {
  HomePage,
  MoviePage,
  MoviesPage,
  ShowPage,
  ShowsPage,
  SignInPage,
} from './pages';
import { FirestoreProvider } from './contexts/firebase/firestore.context';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <div className={styles.app}>
      <FirebaseProvider>
        <AuthProvider>
          <FirestoreProvider>
            <Router basename="">
              <Switch>
                <Route exact path={Routes.LANDING} component={HomePage} />
                <Route from={Routes.HOME} to={Routes.LANDING} />
                <Route
                  exact
                  path={Routes.MOVIE_DETAILS}
                  component={MoviePage}
                />
                <Route exact path={Routes.MOVIES} component={MoviesPage} />
                <Route
                  exact
                  path={Routes.TVSHOW_DETAILS}
                  component={ShowPage}
                />
                <Route exact path={Routes.TVSHOWS} component={ShowsPage} />
                <Route
                  exact
                  path={Routes.AUTH_SIGN_IN}
                  component={SignInPage}
                />
                <Route path={Routes.RESULTS} component={ResultsPage} />
              </Switch>
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
