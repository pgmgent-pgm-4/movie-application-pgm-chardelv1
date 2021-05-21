import { admin, app, auth, db } from './firebase';

/*
* Delete specified User
*/
const deleteUser = async (uid) => {
  return auth.deleteUser(uid);
}

/*
* Delete Users
*/
const deleteUsers = async (nextPageToken) => {
  auth.listUsers(1000, nextPageToken)
    .then(async (listUsersResult) => {
      listUsersResult.users.forEach(async (userRecord) => {
        await deleteUser(userRecord.uid);
      });
      if (listUsersResult.pageToken) {
        await deleteUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error deleting users:', error);
    });
}

/*
* Anonymous function
*/
(async () => {
  try {
    await deleteUsers();
  } catch (err) {
    console.log(err);
  }
})();