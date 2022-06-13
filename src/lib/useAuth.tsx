import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from './firebase'

const authContext = createContext(null);

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}


interface UseAuthReturnValue {
  user: any;
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
}


export interface UserLoginInput {
  email: string;
  password: string;
}

const useProvideAuth = (): UseAuthReturnValue => {
  const [user, setUser] = useState(null);

  const signin = async (data: UserLoginInput) => {
    console.log(data);
    const response = await signInWithEmailAndPassword(auth, data.email, data.password);
    setUser(response.user);
    return response.user;
  };
  
  const signup = async (data: UserAccountCreateInput) => {
    const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
    setUser(response.user);
    const user = response.user;
    // do something with the user
  };

  const signout = async () => {
    await signOut(auth);
    setUser(false);
  };

  // const resetPass = (email) => {
  //   return sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // const confirmPasswordReset = (code, password) => {
  //   return confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

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
    signin,
    signup,
    signout,
  };
}