import { createContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { autenticar, api } from "../services/authApi"
import * as jose from 'jose';

type AuthProviderProps = {
    children: ReactNode
}

type User = {
    nome: string
    email: string
    tipo: string
}

type AuthContextType = {
    isAuthenticated: boolean
    user: User | undefined
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

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
    }, []);

    async function login({ email, senha }: SignInData) {
        try {
            const response = await autenticar({ email, senha })
            const tokenInfo = obterTokenInfo(response.token);

            if (tokenInfo) {
                const user = {
                    nome: tokenInfo.nome,
                    email: tokenInfo.email,
                    tipo: tokenInfo.tipo
                }

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", JSON.stringify(response.token));
                api.defaults.headers.Authorization = `Bearer ${response.token}`;

                setUser(user);
                navigate("/");
            }
        } catch (err) {
            alert(err)
        }
    }

    async function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("notificado");
        setUser(undefined);
        api.defaults.headers.Authorization = null;
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
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
