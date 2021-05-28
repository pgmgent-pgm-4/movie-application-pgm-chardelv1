import React, { useContext } from 'react';
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { useFirebase } from './firebase.context';

const FirestoreContext = React.createContext(null);
const useFirestore = () => useContext(FirestoreContext);

const FirestoreProvider = ({children}) => {
  const { app } = useFirebase();
  const db = app.firestore();

  const getProjects = async () => {
    const query = db.collection('projects')
      .orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const projects = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return projects;
  };

  const getPagedProjects = async (itemsPerPage = 10, lastVisible = null) => {
    let query = null;

    if (lastVisible === null) {
      query = db.collection('projects')
      .orderBy('createdAt', 'desc')      
      .limit(itemsPerPage);
    } else {
      query = db.collection('projects')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(itemsPerPage);
    }
    
    const querySnapshot = await query.get();
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length-1];
    const projects = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return {projects, itemsPerPage, lastVisibleDoc};
  };

  const getProjectById = async (projectId) => {
    const docRef = db.collection('projects').doc(projectId);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Document does not exist!');
    }

    return {
      uid: doc.id,
      ...doc.data()
    }
  };

  const getProjectReviews = async (projectId) => {
    const query = db.collection('projects').doc(projectId).collection('reviews').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const projectReviews = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return projectReviews;
  };

  const addReview = async (projectRef, review) => {
    var reviewRef = projectRef.collection('reviews').doc(uuidv4());

    return db.runTransaction((transaction) => {
        return transaction.get(projectRef).then((res) => {
            if (!res.exists) {
                throw new Error('Document does not exist!');
            }

            // Compute new number of reviews
            var newNumReviews = res.data().numReviews + 1;

            // Compute new average rating
            var oldRatingTotal = res.data().avgRating * res.data().numReviews;
            var newAvgRating = (oldRatingTotal + review.rating) / newNumReviews;

            // Commit to Firestore
            transaction.update(projectRef, {
                numReviews: newNumReviews,
                avgRating: newAvgRating
            });
            transaction.set(reviewRef, review);
        });
    });
  }

  return (
    <FirestoreContext.Provider value={{addReview, getPagedProjects, getProjectById, getProjects, getProjectReviews}}>
      {children}
    </FirestoreContext.Provider>
  );
};

export {
  FirestoreContext,
  FirestoreProvider,
  useFirestore,
};