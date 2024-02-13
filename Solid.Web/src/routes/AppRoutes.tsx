import { useContext, ReactNode } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import PageTitle from '../components/PageTitle';
import Corretores from '../pages/Admin/Corretores';
import Login from '../pages/Authentication/Login';
import Dashboard from '../pages/Dashboard/dashboard';
import Settings from '../pages/Settings';


const AppRoutes = () => {

    const Private = ({ children }: { children: ReactNode }) => {
        const { isAuthenticated } = useContext(AuthContext);

        if (!isAuthenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <>
                        <PageTitle title="LocaçãoSólida | Login" />
                        <Login />
                    </>
                }
            />
            <Route
                index
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Dashboard" />
                        <Dashboard />
                    </Private>
                }
            />
            <Route
                path="/admin/corretores"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Corretores" />
                        <Corretores />
                    </Private>
                }
            />
            <Route
                path="/configuracoes"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Configurações" />
                        <Settings />
                    </Private>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
