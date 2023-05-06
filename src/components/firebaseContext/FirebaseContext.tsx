import { auth } from "../../Firebase";
import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  UserCredential,
} from "firebase/auth";

// ensures that it can be used in any component that is wrapped in the AuthContext.Provider
type AuthProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  user: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  passwordReset: (email: string) => Promise<void>;
  passwordUpdate: (password: string) => Promise<void>;
  emailUpdate: (email: string) => Promise<void>;
};

// this is what you pass into as .Provider
const AuthContext = createContext<ContextType>({} as ContextType);

// custom hook
export const useAuth = (): ContextType => {
  return useContext(AuthContext);
};

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const passwordReset = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    return signOut(auth);
  };

  const emailUpdate = (email: string): Promise<void> => {
    const currUser = auth.currentUser;

    if (currUser) {
      return updateEmail(currUser, email);
    } else {
      return Promise.reject();
    }
  };

  const passwordUpdate = (password: string): Promise<void> => {
    const currUser = auth.currentUser;

    if (currUser) {
      return updatePassword(currUser, password);
    } else {
      return Promise.reject();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const values = {
    signup,
    login,
    logout,
    passwordReset,
    user,
    auth,
    emailUpdate,
    passwordUpdate,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
