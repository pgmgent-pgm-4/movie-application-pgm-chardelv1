import React, { useContext } from 'react';
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { useFirebase } from './firebase.context';

const FirestoreContext = React.createContext(null);
const useFirestore = () => useContext(FirestoreContext);

const FirestoreProvider = ({children}) => {
  const { app } = useFirebase();
  const db = app.firestore();

  const getMovies = async () => {
    const query = db.collection('movies')
      .orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const movies = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return movies;
  };

  const getPagedMovies = async (itemsPerPage = 10, lastVisible = null) => {
    let query = null;

    if (lastVisible === null) {
      query = db.collection('movies')
      .orderBy('createdAt', 'desc')      
      .limit(itemsPerPage);
    } else {
      query = db.collection('movies')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(itemsPerPage);
    }
    
    const querySnapshot = await query.get();
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length-1];
    const movies = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return {movies, itemsPerPage, lastVisibleDoc};
  };

  const getMovieById = async (movieId) => {
    const docRef = db.collection('movies').doc(movieId);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Document does not exist!');
    }

    return {
      uid: doc.id,
      ...doc.data()
    }
  };

  const getMovieComments = async (movieId) => {
    const query = db.collection('movies').doc(movieId).collection('comments').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const movieComments = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return movieComments;
  };

  const getMovieReviews = async (movieId) => {
    const query = db.collection('movies').doc(movieId).collection('reviews').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const movieReviews = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return movieReviews;
  };

  const addMovieReview = async (movieId, review) => {
    let document = await db.collection('movies').doc(movieId).get();
    if (document && document.exists) {
      await document.ref.update({
        modifiedAt: new Date(),
      });
    } else {
      await document.ref.set({
        id: movieId,
        createdAt: new Date(),
        modifiedAt: null,
        deletedAt: null,
        name: null,
      })
    }
    const movieRef = db.collection('movies').doc(movieId);
    var reviewRef = movieRef.collection('reviews').doc(uuidv4());

    return db.runTransaction((transaction) => {
        return transaction.get(movieRef).then((res) => {
            if (!res.exists) {
                throw new Error('Document does not exist!');
            }

            // Compute new number of reviews
            var newNumReviews = res.data().numReviews + 1;

            // Compute new average rating
            var oldRatingTotal = res.data().avgRating * res.data().numReviews;
            var newAvgRating = (oldRatingTotal + review.rating) / newNumReviews;

            // Commit to Firestore
            transaction.update(movieRef, {
                numReviews: newNumReviews,
                avgRating: newAvgRating
            });
            transaction.set(reviewRef, review);
        });
    });
  }
  const getTvShows = async () => {
    const query = db.collection('tv')
      .orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const tvShows = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return movies;
  };

  const getPagedTvShows = async (itemsPerPage = 10, lastVisible = null) => {
    let query = null;

    if (lastVisible === null) {
      query = db.collection('tv')
      .orderBy('createdAt', 'desc')      
      .limit(itemsPerPage);
    } else {
      query = db.collection('tv')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(itemsPerPage);
    }
    
    const querySnapshot = await query.get();
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length-1];
    const tvShows = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return {tvShows, itemsPerPage, lastVisibleDoc};
  };

  const getTvShowById = async (tvShowId) => {
    const docRef = db.collection('tv').doc(tvShowId);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Document does not exist!');
    }

    return {
      uid: doc.id,
      ...doc.data()
    }
  };

  const getTvShowReviews = async (tvShowId) => {
    const query = db.collection('tv').doc(tvShowId).collection('reviews').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const tvShowReviews = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return tvShowReviews;
  };

  const getTvShowComments = async (tvShowId) => {
    const query = db.collection('tv').doc(tvShowId).collection('comments').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const tvShowComments = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return tvShowComments;
  };

  const getCommentComments = async (docType, docId, commentId) => {
    const query = db.collection(docType).doc(docId).collection('comments').doc(commentId).collection('comments').orderBy('createdAt', 'desc');
    const querySnapshot = await query.get();
    const commentComments = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data()
      }
    });
    return commentComments;
  }

  const addCommentToRef = async (docType, docId, colType = null, colId = null, comment) => {
    let document = await db.collection(docType).doc(docId).get();
    if (document && document.exists) {
      await document.ref.update({
        modifiedAt: new Date(),
        numComments: +1
      });
    } else {
      await document.ref.set({
        id: docId,
        createdAt: new Date(),
        modifiedAt: null,
        deletedAt: null,
        name: null,
        numComments: 1
      })
    }
    const parentRef = db.collection(docType).doc(docId);
    let commentRef;
    if (!(!!colType) || !(!!colId)) {
      commentRef = parentRef.collection('comments').doc(uuidv4());
    } else if (!!colType && !!colId) {
      let childRef = parentRef.collection(colType).doc((colId).toString());
      commentRef = childRef.collection(colType).doc(uuidv4());
    } else {
      console.log('this shouldn\'t happen')
    }

    return db.runTransaction((transaction) => {
      return transaction.get(parentRef).then((res) => {
        if (!res.exists) {
          throw new Error('Document does not exist!');
        }

        // Compute new number of comments
        var newNumComments = res.data().numComments + 1;

        transaction.update(parentRef, {
          numComments: newNumComments
        });
        transaction.set(commentRef, comment);
      })
    })
  }

  const addTvShowReview = async (tvShowId, review) => {
    let document = await db.collection('tv').doc(tvShowId).get();
    if (document && document.exists) {
      await document.ref.update({
        modifiedAt: new Date(),
      });
    } else {
      await document.ref.set({
        id: tvShowId,
        createdAt: new Date(),
        modifiedAt: null,
        deletedAt: null,
        name: null,
      })
    }
    const tvShowRef = db.collection('tv').doc(tvShowId);
    var reviewRef = tvShowRef.collection('reviews').doc(uuidv4());

    return db.runTransaction((transaction) => {
        return transaction.get(tvShowRef).then((res) => {
            if (!res.exists) {
                throw new Error('Document does not exist!');
            }

            // Compute new number of reviews
            var newNumReviews = res.data().numReviews + 1;

            // Compute new average rating
            var oldRatingTotal = res.data().avgRating * res.data().numReviews;
            var newAvgRating = (oldRatingTotal + review.rating) / newNumReviews;

            // Commit to Firestore
            transaction.update(tvShowRef, {
                numReviews: newNumReviews,
                avgRating: newAvgRating
            });
            transaction.set(reviewRef, review);
        });
    });
  }

  return (
    <FirestoreContext.Provider value={{addCommentToRef, addMovieReview, getPagedMovies, getMovieById, getMovieComments, getMovies, getMovieReviews, addTvShowReview, getPagedTvShows, getCommentComments, getTvShowComments, getTvShowById, getTvShows, getTvShowReviews}}>
      {children}
    </FirestoreContext.Provider>
  );
};

export {
  FirestoreContext,
  FirestoreProvider,
  useFirestore,
};