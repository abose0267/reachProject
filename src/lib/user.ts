import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
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

export const updateUser = async (uid: string, data: Partial<UserProfile>) => {
  const userDoc = doc(usersRef, uid);
  await updateDoc(userDoc, {
    ...data,
  });
};

export const useAuthenticatedUser = () => {
  const { user } = useAuth();
  const { data: userData, loading } = useDoc<UserProfile>(`users/${user.uid}`);
  // console.log({foo: user.uid})
  return { user: userData, loading };
}


// export const getUsers = async () => {
//   const users = await usersRef.get();
//   return users.docs.map(doc => doc.data());
// }