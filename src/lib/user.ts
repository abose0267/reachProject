import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const usersRef = collection(db, 'users');

export interface UserProfile {
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export interface CreateUserData {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
}

export const createUser = async (uid: string, data: CreateUserData) => {
  const userDoc = doc(usersRef, uid);
  await setDoc(userDoc, {
    ...data,
    role: 'member',
    uid,
  });
};
