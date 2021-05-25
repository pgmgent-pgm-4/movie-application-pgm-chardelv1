import { admin, app, db } from './firebase';

/*
* Delete specified collection firebase
*/
const deleteCollection = async (collectionPath, batchSize) => {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject);
  });
}

/*
* Delete Query Batch in firebase
*/
const deleteQueryBatch = async (query, batchSize, resolve, reject) => {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    }).then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
}

/*
* Anonymous function
*/
(async () => {
  try {
    const collectionPath = process.argv[2];
    const batchSize = process.argv[3];

    await deleteCollection(collectionPath, Number(batchSize));
  } catch (err) {
    console.log(err);
  }
})();