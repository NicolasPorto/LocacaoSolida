import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabelaPartesEnvolvidas from '../../components/Tables/TabelaPartesEnvolvidas';

import { useContext, useEffect, useState } from 'react';
import { ParteEnvolvidaContext } from '../../context/ParteEnvolvidaContext';
import { TipoParte } from '../../constants/enums';

const Locatarios = () => {
  const [locatarios, setLocatarios] = useState([])
  const { buscarPartesEnvolvidas } = useContext(ParteEnvolvidaContext)

  useEffect(() => {
    buscarPartesEnvolvidas(TipoParte.Locatario).then(response => {
      setLocatarios(response)
    })
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Locatarios" />
      <div className="flex flex-col gap-10">
        <TabelaPartesEnvolvidas data={locatarios} tipoParte={TipoParte.Locatario} nomeParte={"Locatario"} />
      </div>
    </DefaultLayout>
  );
};

export default Locatarios;
