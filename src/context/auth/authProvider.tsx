import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { AuthContext } from "./authContext";
import { axiosInstance } from "@/lib/axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (currentUser) {
          const { data: userData } = await axiosInstance.get(
            `/users/${currentUser.email}`,
          );

          setUser({
            ...currentUser,
            role: userData?.data?.role,
            db_id: userData?.data?._id,
          });
          setLoading(false);
        } else {
          setUser(currentUser);
          setLoading(false);
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const signup = async (
    email: string,
    password: string,
    userName: string,
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredential.user, {
      displayName: userName,
    });

    return userCredential;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
