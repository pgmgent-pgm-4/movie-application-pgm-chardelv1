import { createContext, useContext, useEffect, useState } from 'react';
import 'firebase/auth';

import { useFirebase } from './firebase.context';

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('react-firebase-pgm-4:currentUser')));
  const { app } = useFirebase();
  const auth = app.auth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      localStorage.setItem('react-firebase-pgm-4:currentUser', JSON.stringify(user));
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    }
  }, [auth]);

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }    
  };

  const signOut = async () => {
    localStorage.setItem('react-firebase-pgm-4:currentUser', null);
    return await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{currentUser,signInWithEmailAndPassword,signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
};