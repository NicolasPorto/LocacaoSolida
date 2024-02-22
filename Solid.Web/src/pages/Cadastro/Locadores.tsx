import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabelaPartesEnvolvidas from '../../components/Tables/TabelaPartesEnvolvidas';

import { useContext, useEffect, useState } from 'react';
import { ParteEnvolvidaContext } from '../../context/ParteEnvolvidaContext';
import { TipoParte } from '../../constants/enums';

const Locadores = () => {
  const [locadores, setLocadores] = useState([])
  const { buscarPartesEnvolvidas } = useContext(ParteEnvolvidaContext)

  useEffect(() => {
    buscarPartesEnvolvidas(TipoParte.Locador).then(response => {
      setLocadores(response)
    })
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Locadores" />
      <div className="flex flex-col gap-10">
        <TabelaPartesEnvolvidas data={locadores} tipoParte={TipoParte.Locador} nomeParte={"Locador"} />
      </div>
    </DefaultLayout>
  );
};

export default Locadores;
