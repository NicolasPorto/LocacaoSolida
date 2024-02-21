import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabelaFiadores from '../../components/Tables/TabelaFiadores';

import { useContext, useEffect, useState } from 'react';
import { ParteEnvolvidaContext } from '../../context/ParteEnvolvidaContext';
import { TipoParte } from '../../constants/enums';

const Fiadores = () => {
  const [fiadores, setFiadores] = useState([])
  const { buscarPartesEnvolvidas } = useContext(ParteEnvolvidaContext)

  useEffect(() => {
    buscarPartesEnvolvidas(TipoParte.Fiador).then(response => {
      setFiadores(response)
    })
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Fiadores" />
      <div className="flex flex-col gap-10">
        <TabelaFiadores data={fiadores} />
      </div>
    </DefaultLayout>
  );
};

export default Fiadores;
