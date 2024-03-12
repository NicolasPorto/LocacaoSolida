import { useContext, ReactNode } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import PageTitle from '../components/Dashboard/PageTitle';
import Login from '../pages/Authentication/Login';
import Dashboard from '../pages/Dashboard/dashboard';
import Settings from '../pages/Settings';
import Corretores from '../pages/Admin/Corretores';
import Locadores from '../pages/Cadastro/Locadores';
import Locatarios from '../pages/Cadastro/Locatarios';
import Fiadores from '../pages/Cadastro/Fiadores';
import Imoveis from '../pages/Cadastro/Imoveis';
import ValorFixo from "../pages/Financeiro/ValorFixo";
import Contratos from "../pages/Contrato/Contratos";
import Parcelas from "../pages/Contrato/Parcelas";
import PageNotFound from "../components/ErrorBoundary/PageNotFound";

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
            <Route path="*" element={<ErrorBoundary><PageNotFound /></ErrorBoundary>} />

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
                path="/cadastro/imoveis"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Imóveis" />
                        <Imoveis />
                    </Private>
                }
            />
            <Route
                path="/contratos/cadastrar"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Contratos" />
                        <Contratos />
                    </Private>
                }
            />
            <Route
                path="/contratos/parcelas"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Parcelas" />
                        <Parcelas />
                    </Private>
                }
            />
            <Route
                path="/financeiro/valorfixo"
                element={
                    <Private>
                        <PageTitle title="LocaçãoSólida | Valor Fixo" />
                        <ValorFixo />
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
