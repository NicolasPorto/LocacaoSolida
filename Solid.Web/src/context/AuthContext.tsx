import { createContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { autenticar, recuperarInfoUsuario, api } from "../services/authApi"
import * as jose from 'jose';
import Cookies from 'js-cookie';

type AuthProviderProps = {
    children: ReactNode
}

type User = {
    codigo: string
    nome: string
    email: string
    tipo: number
}

type AuthContextType = {
    isAuthenticated: boolean
    user: User | undefined
    error: string | undefined
    login: (data: SignInData) => Promise<void>
    logout: () => Promise<void>
}

type SignInData = {
    email: string
    senha: string
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            recuperarInfoUsuario(token).then(response => {
                setUser(response)
            })
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
    }, []);

    async function login({ email, senha }: SignInData) {
        try {
            const response = await autenticar({ email, senha })
            const tokenInfo = obterTokenInfo(response.token);

            if (tokenInfo) {
                const user = {
                    codigo: response.codigo,
                    nome: tokenInfo.nome,
                    email: tokenInfo.email,
                    tipo: parseInt(tokenInfo.tipo)
                }

                Cookies.set('token', response.token, { expires: 1 });
                api.defaults.headers.Authorization = `Bearer ${response.token}`;

                setUser(user);
                navigate("/");
            }
        } catch (err: any) {
            setError(err);
        }
    }

    async function logout() {
        Cookies.remove('token')
        api.defaults.headers.Authorization = null;
        setUser(undefined);
        navigate("/login");
    };

    const obterTokenInfo = (token: any) => {
        const decodedToken = jose.decodeJwt(token) as { [key: string]: any };
        if (decodedToken) {
            return decodedToken;
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
