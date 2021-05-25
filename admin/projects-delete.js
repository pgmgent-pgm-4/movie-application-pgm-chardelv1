import { admin, app, auth, db } from './firebase';

/**
 * Delete specified Project
 */
const deleteProject = async (pid)