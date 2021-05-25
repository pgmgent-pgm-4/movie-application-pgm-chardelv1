import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';

(async () => {
  /*
   * Create a User (Local Provider)
  */
  const createUser = async (email, password, displayName, photoURL) => {
    try {
      const data = {
        email,
        emailVerified: false,
        password,
        displayName,
        photoURL,
        disabled: false,
      };
      const userData = await auth.createUser(data); 
      console.log(`Added user with email ${email}. Returned id: ${userData.uid}`);
    } catch (ex) {
      console.log(ex);
    }
  };

  /*
   * Create a Users via promises
  */
  const createUsers = async (n = 20) => {
    const promises = [];
    for (let i=0; i < n;i++) {
      const gender = generateValueBetweenMinAndMax(0, 1);
      promises.push(await createUser(faker.internet.email(faker.name.firstName(gender), faker.name.lastName(gender)), 'w84pgmGent', faker.internet.displayName, `https://robohash.org/${uuidv4()}?gravatar=hashed`));
    }
    return await Promise.all(promises);
  };

  /*
   * Create Models in Auth
  */
  await createUsers(16);

})();