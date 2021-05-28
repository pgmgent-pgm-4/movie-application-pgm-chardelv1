import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { admin, app, db, generateTimestamps } from './firebase';
import firebase from 'firebase';

const GDMGENT_API_CASES = 'https://www.gdm.gent/static/data/cases.json';

(async () => {
  // Get movies collection
  let collectionRef = db.collection('movies');

  // Create a Movie
  const createMovie = (movie) => {
    // Add a document via movie object
    const data = {
      title: movie.Title,
      description: movie.Description,
      thumbnailURL: movie.Picture,
      ...generateTimestamps()
    };

    collectionRef.doc(uuidv4()).set(data).then(documentReference => {
      console.log(`Added movie.`);
    });
  };

  // Create movies via promises
  const createMovies = async () => {
    const response = await fetch(`${GDMGENT_API_CASES}`);
    const jsonData = await response.json();

    db.collection('counters').doc('movies').set({numAmount: jsonData.length}, {merge: true});

    const promises = [];
    jsonData.forEach(movie => {
      promises.push(createMovie(movie));
    });
    return await Promise.all(promises);
  };

  await createMovies(); 
})();