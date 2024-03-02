import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabelaImoveis from '../../components/Tables/TabelaImoveis';

import { useContext, useEffect, useState } from 'react';
import { ImovelContext } from '../../context/ImovelContext';

const Imoveis = () => {
  const [imoveis, setImoveis] = useState([])
  const { buscarImoveis } = useContext(ImovelContext)

  useEffect(() => {
    buscarImoveis().then(response => {
      setImoveis(response)
    })
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Imóveis" />
      <div className="flex flex-col gap-10 overflow-y-auto">
        <TabelaImoveis data={imoveis} />
      </div>
    </DefaultLayout>
  );
};

export default Imoveis;
