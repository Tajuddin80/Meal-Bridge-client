import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { AuthContext } from "../AuthContext/AuthContext";
import { auth } from "../firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Email Signup
  const handleEmailSignup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email Signin
  const handleEmailSignin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Signin
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign Out
  const handleLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Listen to auth state change

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null); 
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext
      value={{
        user,
        loading,
        handleEmailSignup,
        handleEmailSignin,
        handleLogout,
        handleGoogleSignIn,
        setUser,
        setUsername,
        username,
        setPhoto,
        photo,
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthProvider;