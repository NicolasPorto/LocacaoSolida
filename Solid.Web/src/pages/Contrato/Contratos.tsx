import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

import TabelaContratos from '../../components/Tables/TabelaContratos';
import CadastroContrato from '../../components/Contrato/CadastroContrato';

const Contratos = ({ }) => {
  const [etapa, setEtapa] = useState(1);
  const [contratos, setContratos] = useState([])

  const avancarEtapa = () => {
    setEtapa(etapa + 1);
  };

  const retrocederEtapa = () => {
    setEtapa(etapa - 1);
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10 overflow-y-auto">
        {etapa === 1 &&
          <>
            <Breadcrumb pageName="Contratos" />
            <TabelaContratos data={contratos} avancarEtapa={avancarEtapa} />
          </>
        }

        {etapa === 2 &&
          <CadastroContrato retrocederEtapa={retrocederEtapa} />
        }
      </div>
    </DefaultLayout>
  );
};

export default Contratos;
