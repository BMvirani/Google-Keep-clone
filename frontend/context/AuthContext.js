"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import AuthService from "@/app/service/api/auth.services";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const firebaseRes = await signInWithPopup(auth, provider);
    const userInfo = firebaseRes?.user?.providerData[0];
    const param = {
      email: userInfo.email,
      name: userInfo?.displayName,
      googleId: userInfo?.uid,
    };
    const res = await AuthService.Login(param);
    localStorage.setItem("userId",res.data.user.googleId) 
  };

  const logOut = () => {
    signOut(auth);
    localStorage.removeItem("userId")
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>   {
      setUser(currentUser?.providerData[0]);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
