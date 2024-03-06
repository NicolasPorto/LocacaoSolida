import { useState, useEffect, useContext } from "react";
import { CorretorContext } from '../../context/CorretorContext';
import { ToSituacaoEnum } from "../../extensions/EnumExtension";
import { FormatarDocumentoFederal, FormatarData } from "../../extensions/FormatacaoExtension";

import ModalCorretores from '../../components/Modal/ModalCorretores'

const TabelaCorretores = ({ data }: any) => {
    const [corretores, setCorretores] = useState([])
    const [show, setShowModal] = useState(false)
    const [selectedCorretor, setSelectedCorretor] = useState()
    const { buscarCorretores } = useContext(CorretorContext)

    useEffect(() => {
        setCorretores(data)
    }, [data])

    const mostrarModal = () => {
        setShowModal(true)
    }

    const fecharModal = () => {
        setSelectedCorretor(undefined);
        setShowModal(false);
    };

    const handleSelecaoCorretor = (corretor: any) => {
        setSelectedCorretor(corretor);
        mostrarModal();
    };

    const atualizarCorretores = async () => {
        const response = await buscarCorretores();
        setCorretores(response);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="pb-4">
                <button type="button" onClick={mostrarModal} className="text-white bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:hover:bg-primary focus:outline-none dark:focus:ring-blue-800">
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
                                Email
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Empresa
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Documento Federal
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
                        {corretores.map((corretor: any, key) => (
                            <tr key={key}>
                                <td className="hidden">
                                    {corretor.codigo}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {corretor.nome}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {corretor.email}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {corretor.empresa}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {FormatarDocumentoFederal(corretor.documentoFederal)}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {ToSituacaoEnum(corretor.situacao)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {FormatarData(corretor.dtInclusao)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => handleSelecaoCorretor(corretor)} className="hover:text-primary">
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalCorretores visivel={show} corretor={selectedCorretor} onClose={() => {
                fecharModal();
                atualizarCorretores();
            }} />
        </div>
    );
};

export default TabelaCorretores;
