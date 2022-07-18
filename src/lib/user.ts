import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from './schema';
import { useAuth } from './useAuth';
import { useDoc } from './useFirebase';

const usersRef = collection(db, 'users');

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


export const useAuthenticatedUser = () => {
  const { user } = useAuth();
  const { data: userData } = useDoc<UserProfile>('users', user.uid);
  return { user: userData };
}

// export const getUsers = async () => {
//   const users = await usersRef.get();
//   return users.docs.map(doc => doc.data());
// }