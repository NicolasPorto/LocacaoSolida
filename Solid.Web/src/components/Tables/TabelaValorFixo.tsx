import { useState, useEffect, useContext } from "react";
import { ValorFixoContext } from "../../context/ValorFixoContext";
import { FormatarValor } from "../../extensions/FormatacaoExtension";
import { ToTipoValorEnum } from "../../extensions/EnumExtension";

import ModalValorFixo from "../Modal/ModalValorFixo";

const TabelaValorFixo = ({ data }: any) => {
    const [valores, setValores] = useState([])
    const [show, setShowModal] = useState(false)
    const [selectedValorFixo, setSelectedValorFixo] = useState()
    const { buscarValorFixo } = useContext(ValorFixoContext)

    useEffect(() => {
        setValores(data)
    }, [data])

    const mostrarModal = () => {
        setShowModal(true)
    }

    const fecharModal = () => {
        setSelectedValorFixo(undefined);
        setShowModal(false);
    };

    const handleSelecaoValorFixo = (valor: any) => {
        setSelectedValorFixo(valor);
        mostrarModal();
    };

    const atualizarValores = async () => {
        const response = await buscarValorFixo();
        setValores(response);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="pb-4">
                <button type="button" onClick={mostrarModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Cadastrar
                </button>
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="hidden">
                                Codigo
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Nome
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Valor
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Porcentagem
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Tipo
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {valores.map((valor: any, key) => (
                            <tr key={key}>
                                <td className="hidden">
                                    {valor.codigo}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {valor.nome}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        R$ {FormatarValor(valor.valor)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="font-medium text-black dark:text-white">
                                        {valor.porcentagemValor}%
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {ToTipoValorEnum(valor.tipoValor)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => handleSelecaoValorFixo(valor)} className="hover:text-primary">
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalValorFixo visivel={show} valorFixo={selectedValorFixo} onClose={() => {
                fecharModal();
                atualizarValores();
            }} />
        </div>
    );
};

export default TabelaValorFixo;
