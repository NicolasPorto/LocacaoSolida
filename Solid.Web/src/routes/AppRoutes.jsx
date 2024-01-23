import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

import Login from '../pages/Login';
import Home from '../pages/Home';

const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading"> Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <Routes>
            <Route path="*" element={<ErrorBoundary pathError={true} />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route exact index element={<Private><Home /></Private>} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;