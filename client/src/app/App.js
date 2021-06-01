import { AuthProvider, FirebaseProvider } from './contexts/firebase';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import * as Routes from './routes';

import styles from './App.module.scss';
import { HomePage, MoviePage, MoviesPage, ShowPage, ShowsPage, SignInPage } from './pages';
import { FirestoreProvider } from './contexts/firebase/firestore.context';

function App() {
  return (
    <div className={styles.app}>
      <FirebaseProvider>
        <AuthProvider>
          <FirestoreProvider>
            <Router basename={'movie-application-pgm-chardelv1'}>
              <Switch>
                  <Route exact path={Routes.LANDING} component={ HomePage }/>
                  <Route from={Routes.HOME} to={Routes.LANDING}/>
                  <Route exact path={Routes.MOVIE_DETAILS} component={ MoviePage }/>
                  <Route exact path={Routes.MOVIES} component={ MoviesPage }/>
                  <Route exact path={Routes.TVSHOW_DETAILS} component={ ShowPage }/>
                  <Route exact path={Routes.TVSHOWS} component={ ShowsPage }/>
                  <Route exact path={Routes.AUTH_SIGN_IN} component={ SignInPage }/>
              </Switch>
            </Router>
          </FirestoreProvider>
        </AuthProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
