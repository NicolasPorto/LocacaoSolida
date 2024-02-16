import { useContext, ReactNode } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import PageTitle from '../components/PageTitle';
import Login from '../pages/Authentication/Login';
import Dashboard from '../pages/Dashboard/dashboard';
import Settings from '../pages/Settings';
import Corretores from '../pages/Admin/Corretores';
import Locadores from '../pages/Cadastro/Locadores';
import Locatarios from '../pages/Cadastro/Locatarios';
import Fiadores from '../pages/Cadastro/Fiadores';


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
                path="/cadastro/locadores"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Locadores" />
                        <Locadores />
                    </Private>
                }
            />
            <Route
                path="/cadastro/locatarios"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Locatarios" />
                        <Locatarios />
                    </Private>
                }
            />
            <Route
                path="/cadastro/fiadores"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Fiadores" />
                        <Fiadores />
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
