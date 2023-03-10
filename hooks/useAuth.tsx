import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../lib/firebase'

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
  }
  
  const AuthContext = createContext<IAuth>({
    user: null,  // by default
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
  })

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);  // firebase user 
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(false);  // block ui
    const router = useRouter();

    // persist the user (when refresh after login, not go back to login page)
    useEffect(() =>
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // Logged in
            setUser(user);
            setLoading(false);
        } else {
            // Not logged in
            setUser(null);
            setLoading(true);
            router.push('/login');
        }
        setInitialLoading(false);
    }), [auth]);

    // sign up
    const signUp = async (email: string, password: string) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                router.push('/')  // to home screen
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };
    //  sign in 
    const signIn = async (email: string, password: string) => {
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                router.push('/')  // to home screen
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };
    // Log out
    const logout = async () => {
        setLoading(true)

        signOut(auth)
            .then(() => {setUser(null)})
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    }

    const memoedValue = useMemo(() => ({
        user, signUp, signIn, loading, logout, error
    }), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}>
            { !initialLoading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
