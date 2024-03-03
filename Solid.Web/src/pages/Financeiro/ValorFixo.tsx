import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabelaValorFixo from '../../components/Tables/TabelaValorFixo';

import { useContext, useEffect, useState } from 'react';
import { ValorFixoContext } from '../../context/ValorFixoContext';

const ValorFixo = () => {
    const [valores, setValores] = useState([])
    const { buscarValorFixo } = useContext(ValorFixoContext)

    useEffect(() => {
        buscarValorFixo().then(response => {
            setValores(response)
        })
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Cadastrar Valor Fixo" />
            <div className="flex flex-col gap-10 overflow-y-auto">
                <TabelaValorFixo data={valores} />
            </div>
        </DefaultLayout>
    );
};

export default ValorFixo;
