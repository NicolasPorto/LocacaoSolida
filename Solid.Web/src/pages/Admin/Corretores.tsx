import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabelaCorretores from '../../components/Tables/TabelaCorretores';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TipoCorretor } from '../../constants/enums';
import { Navigate } from 'react-router-dom';
import { CorretorContext } from '../../context/CorretorContext';

const Corretores = () => {
  const { user } = useContext(AuthContext)
  const [corretores, setCorretores] = useState([])
  const { buscarCorretores } = useContext(CorretorContext)

  useEffect(() => {
    buscarCorretores().then(response => {
      setCorretores(response)
    })
  }, [])


  if (user !== undefined && user.tipo == TipoCorretor.Comum) {
    return <Navigate to="/" />
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Corretores" />
      <div className="flex flex-col gap-10">
        <TabelaCorretores data={corretores} />
      </div>
    </DefaultLayout>
  );
};

export default Corretores;
