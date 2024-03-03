import { useState, useEffect, useContext } from "react";
import { ParteEnvolvidaContext } from '../../context/ParteEnvolvidaContext';
import { FormatarDocumentoFederal, FormatarData, FormatarNumeroCelular } from "../../extensions/FormatacaoExtension";

import ModalFiadores from '../Modal/ModalPartesEnvolvidas'

const TabelaPartesEnvolvidas = ({ data, tipoParte, nomeParte }: any) => {
    const [partesEnvolvidas, setParteEnvolvida] = useState([])
    const [show, setShowModal] = useState(false)
    const [selectedParteEnvolvida, setSelectedParteEnvolvida] = useState()
    const { buscarPartesEnvolvidas } = useContext(ParteEnvolvidaContext)

    useEffect(() => {
        setParteEnvolvida(data)
    }, [data])

    const mostrarModal = () => {
        setShowModal(true)
    }

    const fecharModal = () => {
        setSelectedParteEnvolvida(undefined);
        setShowModal(false);
    };

    const handleSelecaoParte = (parte: any) => {
        setSelectedParteEnvolvida(parte);
        mostrarModal();
    };

    const atualizarParte = async () => {
        const response = await buscarPartesEnvolvidas(tipoParte);
        setParteEnvolvida(response);
    };

    return (
        <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                                Email
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                CPF
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Número Celular
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Cidade
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Data Inclusão
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {partesEnvolvidas.map((parteEnvolvida: any, key) => (
                            <tr key={key}>
                                <td className="hidden">
                                    {parteEnvolvida.codigo}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {parteEnvolvida.nome}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {parteEnvolvida.email}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {FormatarDocumentoFederal(parteEnvolvida.cpf)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {FormatarNumeroCelular(parteEnvolvida.numeroCelular)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {parteEnvolvida.cidade}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {FormatarData(parteEnvolvida.dtInclusao)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => handleSelecaoParte(parteEnvolvida)} className="hover:text-primary">
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalFiadores visivel={show} parteEnvolvida={selectedParteEnvolvida} nomeParte={nomeParte} tipoParte={tipoParte} onClose={() => {
                fecharModal();
                atualizarParte();
            }} />
        </div>
    );
};

export default TabelaPartesEnvolvidas;
