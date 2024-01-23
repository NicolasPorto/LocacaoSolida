import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, autenticarUsuario } from "../services/authApi";
import { TipoUsuarioEnum } from '../constants/enums';
import jwt from 'jsonwebtoken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (recoveredUser && token) {
            const tokenInfo = getTokenInfo(JSON.parse(token));

            if (tokenInfo.exp < Date.now() / 1000) {
                showErrorNotification("Token expirado.");
                logout();
            } else {
                setUser(JSON.parse(recoveredUser));
                api.defaults.headers.Authorization = `Bearer ${token}`;
            }
        }

        setLoading(false);
    }, []);

    const login = async (autenticarRequest) => {
        try {
            const response = await autenticarUsuario(autenticarRequest)

            const token = response.Token;
            const tokenInfo = getTokenInfo(token);

            if (tokenInfo && validarRoles(tokenInfo)) {
                const loggedUser = {
                    user: autenticarRequest.login,
                    codigo: response.Codigo,
                }

                localStorage.setItem("user", JSON.stringify(loggedUser));
                localStorage.setItem("token", JSON.stringify(token));
                api.defaults.headers.Authorization = `Bearer ${token}`;

                showSuccessNotification("Usuário encontrado!")
                setUser(loggedUser);
                navigate("/");
            } else {
                showErrorNotification('Token inválido ou expirado.');
                logout();
            }
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        api.defaults.headers.Authorization = null;
        navigate("/login");
    };

    const validarRoles = (tokenInfo) => {
        if (tokenInfo?.TipoCorretor !== TipoCorretor.Administrador && tokenInfo?.TipoCorretor !== TipoCorretor.Comum) {
            showErrorNotification('O Usuário não possui permissão para acessar o sistema.');
            return false;
        }

        return true;
    };

    const getTokenInfo = (token) => {
        return jwt.decode(token);
    };

    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, login, logout, navigate, getTokenInfo }}>
            {children}
        </AuthContext.Provider>
    );
};