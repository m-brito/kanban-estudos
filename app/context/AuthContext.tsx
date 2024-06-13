'use client';

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { api, setTokenInterceptor } from '../api/connection';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

interface LoginData {
    email: string;
    password: string;
}

interface User {
    username: string;
    email: string;
    token: string;
    is_staff: boolean;
}

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    Login: (userData: LoginData) => Promise<void>;
    Logout: () => void;
}

const defaultValues: AuthContextProps = {
    user: null,
    loading: true,
    Login: async () => {},
    Logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultValues);

export const COOKIE_USER_TOKEN = 'user';

function saveUserCookie(userJson: User, expires: Date) {
    Cookies.set(COOKIE_USER_TOKEN, JSON.stringify(userJson), {
        secure: true,
        expires,
    });
}

function deleteUserCookie() {
    Cookies.remove(COOKIE_USER_TOKEN);
}

function getUserCookie(): User | null {
    const userString = Cookies.get(COOKIE_USER_TOKEN);
    return userString ? JSON.parse(userString) : null;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function Login(userData: LoginData) {
        const dateNow = moment();

        const response = await api.post(
            'https://auth.biotronica.tech/login/user/login',
            userData,
        );
        const { token, is_staff } = response.data;

        const userDecoded = jwtDecode<User>(token);
        userDecoded.is_staff = is_staff;
        userDecoded.token = token;

        const expiresDate = dateNow.add(1, 'd').toDate();
        saveUserCookie(userDecoded, expiresDate);
        setTokenInterceptor(token);
        setUser(userDecoded);
        // useHistory().push("/")
    }

    const Logout = () => {
        deleteUserCookie();
        setUser(null);
        setTokenInterceptor(null);
        // useHistory().push("/")
    };

    useEffect(() => {
        async function checkUserIsLogin() {
            const userCookie = getUserCookie();
            if (userCookie !== null) {
                setUser(userCookie);
                setTokenInterceptor(userCookie.token);
            }
            setLoading(false);
        }
        checkUserIsLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, Login, Logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextProps {
    return useContext(AuthContext);
}
