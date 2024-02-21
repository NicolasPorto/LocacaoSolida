import { TipoPessoa, TipoCorretor, Situacao, TipoParte } from '../../constants/enums';
import { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { ToSituacaoEnum, ToTipoCorretorEnum, ToTipoPessoaEnum } from "../../extensions/EnumExtension";
import { ParteEnvolvidaContext } from '../../context/ParteEnvolvidaContext';

import DocumentoFederal from '../Forms/Input/DocumentoFederal';
import Telefone from '../Forms/Input/Telefone';

const ModalFiadores = ({ visivel, fiador, onClose }: any) => {
    const { inserirParteEnvolvida, editarParteEnvolvida, error } = useContext(ParteEnvolvidaContext)
    const [show, setShowModal] = useState(false)
    const [errorBack, setErrorBack] = useState<string | undefined>(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [docFederal, setDocFederal] = useState('');
    const [telefone, setTelefone] = useState('');
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        setShowModal(visivel);
        if (visivel) {
            setErrorBack(undefined);
        }
    }, [visivel]);

    useEffect(() => {
        setErrorBack(error);
    }, [error]);

    const handleCloseModal = () => {
        setShowModal(false);
        setTelefone('')
        setDocFederal('')
        reset();
        onClose();
    }

    useEffect(() => {
        if (fiador !== undefined) {
            setIsEdit(true);
            setDocFederal(fiador.documentoFederal)
            setTelefone(fiador.numeroCelular)
        } else {
            setIsEdit(false);
        }
    }, [fiador]);

    async function confirmarRegistro(data: any) {
        if (!isEdit) {
            const response = await criarFiador(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        } else {
            const response = await alterarFiador(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        }
    }

    async function criarFiador(data: any) {
        return await inserirParteEnvolvida(data)
    }

    async function alterarFiador(data: any) {
        data.documentoFederal = docFederal
        data.email = fiador.email
        return await editarParteEnvolvida(data)
    }

    return (
        <>
            {show &&
                <div>
                    <div className="fixed inset-0 flex md:items-center justify-center z-50 ">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg shadow-lg max-w-3xl md:w-full mx-2 my-2">
                            <div className="flex items-center justify-between p-4 border-b">
                                {isEdit &&
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Editar Fiador
                                    </h3>
                                }
                                {!isEdit &&
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Criar Fiador
                                    </h3>
                                }
                                <button type="button" onClick={handleCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5" onSubmit={handleSubmit(confirmarRegistro)} >
                                <div className="grid gap-4 mb-4 grid-cols-2 pb-4">
                                    {isEdit &&
                                        <>
                                            <div className="hidden">
                                                <input
                                                    {...register('codigo')}
                                                    defaultValue={fiador && fiador.codigo}
                                                    type="text"
                                                    name="codigo"
                                                    id="codigo"
                                                />
                                            </div>

                                            <div className="hidden">
                                                <input
                                                    {...register('dtInclusao')}
                                                    defaultValue={fiador && fiador.dtInclusao}
                                                    type="text"
                                                    name="dtInclusao"
                                                    id="dtInclusao"
                                                />
                                            </div>
                                        </>
                                    }
                                    <div className="hidden">
                                        <input
                                            {...register('tipoParte')}
                                            defaultValue={TipoParte.Fiador}
                                            type="number"
                                            name="tipoParte"
                                            id="tipoParte"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('nome')}
                                            defaultValue={fiador && fiador.nome}
                                            type="text"
                                            name="nome"
                                            id="nome"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Digite o nome"
                                            required
                                            autoComplete="on"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('email')}
                                            defaultValue={fiador && fiador.email}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Digite o e-mail"
                                            required
                                            disabled={isEdit}
                                            autoComplete="on"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="documentoFederal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Documento Federal <span style={{ color: 'red' }}>*</span></label>
                                        <DocumentoFederal
                                            register={register}
                                            name="documentoFederal"
                                            id="documentoFederal"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Digite o CPF/CNPJ"
                                            value={docFederal}
                                            onChange={setDocFederal}
                                            disabled={isEdit}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="telefone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                                        <Telefone
                                            register={register}
                                            name="numeroCelular"
                                            id="numeroCelular"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            required={false}
                                            value={telefone}
                                            onChange={setTelefone}
                                        />
                                    </div>
                                    {/* <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="situacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Situação <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('situacao')}
                                            defaultValue={corretor !== undefined ? corretor.situacao : "0"}
                                            id="situacao"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="0" disabled>Selecione a situação</option>
                                            {Object.values(Situacao).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToSituacaoEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div> */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profissão</label>
                                        <input
                                            {...register('profissao')}
                                            defaultValue={fiador && fiador.profissao}
                                            type="text"
                                            name="profissao"
                                            id="profissao"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Digite a profissão"
                                            required
                                        />
                                    </div>
                                </div>
                                {errorBack && <div className="text-red-500 text-center">{errorBack}</div>}
                                <div className='flex justify-end'>
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                        Confirmar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            }
        </>
    );
};

export default ModalFiadores;
