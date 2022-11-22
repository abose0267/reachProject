import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserProfile } from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from './firebase'
import { useDoc } from "./useFirebase";
import { createUser } from "./user";

const authContext = createContext(null);

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

interface UseAuthReturnValue {
  user: any;
  // profile: UserProfile;
  signin: (data: UserLoginInput) => Promise<User>;
  signup: (data: UserAccountCreateInput) => Promise<void>;
  signout: () => Promise<void>;
}

export const useAuth = () => {
  return useContext<UseAuthReturnValue>(authContext);
};

export interface UserAccountCreateInput {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  title: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

const useProvideAuth = (): UseAuthReturnValue => {
  const [user, setUser] = useState(null);
  // console.log('uid', auth.currentUser?.uid);
  // const {data: profile} = useDoc<UserProfile>('users', auth.currentUser?.uid);
  const signin = async (data: UserLoginInput) => {
    const response = await signInWithEmailAndPassword(auth, data.email, data.password);
    setUser(response.user);
    return response.user;
  };
  
  const signup = async (data: UserAccountCreateInput) => {
    const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
    setUser(response.user);
    const { uid } = response.user;
    createUser(uid, {
      email: data.email,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
    })
  };

  const signout = async () => {
    await signOut(auth);
    setUser(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    // profile,
    signin,
    signup,
    signout,
  };
}

// export const useAuthenticatedUser = () => {
//   const { user } = useAuth();
//   const { data: userData } = useDoc<UserProfile>('users', user.uid);
//   return { user: userData };
// }
