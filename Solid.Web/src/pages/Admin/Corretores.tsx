import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabelaCorretores from '../../components/Tables/TabelaCorretores';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TipoCorretor } from '../../constants/enums';
import { Navigate } from 'react-router-dom';

const Corretores = () => {
  const { user } = useContext(AuthContext)

  if (user !== undefined && user.tipo == TipoCorretor.Comum) {
    return <Navigate to="/" />
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Corretores" />
      <div className="flex flex-col gap-10">
        <TabelaCorretores />
      </div>
    </DefaultLayout>
  );
};

export default Corretores;
