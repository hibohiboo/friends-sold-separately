import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { firebaseApp } from '.';

let auth: Auth | null = null;
export const getFirebaseAuth = () => {
  if (auth) return auth;
  auth = getAuth(firebaseApp);
  return auth;
};
