import { useState, useEffect, useContext } from "react";
import { ImovelContext } from "../../context/ImovelContext";
import { ToTipoImovelEnum, ToTipoSituacaoImovelEnum } from "../../extensions/EnumExtension";
import { FormatarData } from "../../extensions/FormatacaoExtension";
import { ParteEnvolvidaContext } from "../../context/ParteEnvolvidaContext";

import ModalImoveis from "../Modal/ModalImoveis";
import { TipoParte } from "../../constants/enums";

const TabelaImoveis = ({ data }: any) => {
    const [imoveis, setImoveis] = useState([])
    const [comboParte, setComboParte] = useState<{ codigoLocador: string, nome: string }[]>([]);
    const [show, setShowModal] = useState(false)
    const [selectedImovel, setSelectedImovel] = useState()
    const { buscarImoveis } = useContext(ImovelContext)
    const { obterComboParteEnvolvida } = useContext(ParteEnvolvidaContext)

    useEffect(() => {
        setImoveis(data)
    }, [data])

    const mostrarModal = () => {
        setShowModal(true)
    }

    const fecharModal = () => {
        setSelectedImovel(undefined);
        setShowModal(false);
    };

    const handleSelecaoImovel = (imovel: any) => {
        setSelectedImovel(imovel);
        mostrarModal();
    };

    const atualizarImoveis = async () => {
        const response = await buscarImoveis();
        setImoveis(response);
    };

    useEffect(() => {
        obterComboParteEnvolvida(TipoParte.Locador).then(response => {
            setComboParte(response)
        })
    }, [])

    const obterNomeLocador = (codigoLocador: string) => {
        const locador = comboParte.find((parte: any) => parte.codigo === codigoLocador);
        return locador ? locador.nome : "Locador não encontrado";
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
                                Locador
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                TipoImovel
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                CEP
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Logradouro
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Número
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Bairro
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Cidade
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Situação
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Data Inclusão
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {imoveis.map((imovel: any, key) => (
                            <tr key={key}>
                                <td className="hidden">
                                    {imovel.codigo}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {obterNomeLocador(imovel.codigoLocador)}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {ToTipoImovelEnum(imovel.tipoImovel)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {imovel.cep}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {imovel.logradouro}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {imovel.numeroLogradouro}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {imovel.bairro}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {imovel.cidade}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {ToTipoSituacaoImovelEnum(imovel.situacao)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {FormatarData(imovel.dtInclusao)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => handleSelecaoImovel(imovel)} className="hover:text-primary">
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalImoveis visivel={show} imovel={selectedImovel} comboParte={comboParte} onClose={() => {
                fecharModal();
                atualizarImoveis();
            }} />
        </div>
    );
};

export default TabelaImoveis;
