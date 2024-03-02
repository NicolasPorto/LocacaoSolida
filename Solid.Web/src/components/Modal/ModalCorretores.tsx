import { TipoPessoa, TipoCorretor, Situacao } from '../../constants/enums';
import { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { ToSituacaoEnum, ToTipoCorretorEnum, ToTipoPessoaEnum } from "../../extensions/EnumExtension";
import { CorretorContext } from '../../context/CorretorContext';
import { FormatarDocumentoFederal, FormatarNumeroCelular } from '../../extensions/FormatacaoExtension';

import DocumentoFederal from '../Forms/Input/DocumentoFederal';
import Telefone from '../Forms/Input/Telefone';

const ModalCorretores = ({ visivel, corretor, onClose }: any) => {
    const { inserirCorretor, editarCorretor, limparErro, error } = useContext(CorretorContext)
    const [show, setShowModal] = useState(false)
    const [errorBack, setErrorBack] = useState<string | undefined>(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [docFederal, setDocFederal] = useState('');
    const [telefone, setTelefone] = useState('');
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            codigo: corretor?.codigo || '',
            nome: corretor?.nome || '',
            email: corretor?.email || '',
            documentoFederal: corretor?.documentoFederal || '',
            numeroCelular: corretor?.numeroCelular || '',
            tipoPessoa: corretor?.tipoPessoa || 0,
            tipoCorretor: corretor?.tipoCorretor || 0,
            situacao: corretor?.situacao || 0,
            empresa: corretor?.empresa || ''
        }
    });

    useEffect(() => {
        setShowModal(visivel);
        if (visivel) {
            setErrorBack(undefined);
            limparErro()
        }
    }, [visivel]);

    useEffect(() => {
        setErrorBack(error);
    }, [error]);

    const handleCloseModal = () => {
        setShowModal(false);
        limparValores();
        onClose();
    }

    useEffect(() => {
        if (corretor !== undefined) {
            setIsEdit(true);
            reset(corretor);
            setValue('documentoFederal', FormatarDocumentoFederal(corretor?.documentoFederal));
            setValue('numeroCelular', FormatarNumeroCelular(corretor?.numeroCelular));
            setDocFederal(corretor.documentoFederal)
            setTelefone(corretor.numeroCelular)
        } else {
            setIsEdit(false);
            limparValores();
        }
    }, [corretor, reset]);

    const limparValores = () => {
        setTelefone('');
        setDocFederal('');
        reset({
            codigo: '',
            nome: '',
            email: '',
            documentoFederal: '',
            numeroCelular: '',
            tipoPessoa: 0,
            tipoCorretor: 0,
            situacao: 0,
            empresa: ''
        });
    };

    async function confirmarRegistro(data: any) {
        if (!isEdit) {
            const response = await criarCorretor(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        } else {
            const response = await alterarCorretor(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        }
    }

    async function criarCorretor(data: any) {
        data.documentoFederal = docFederal
        data.numeroCelular = telefone
        return await inserirCorretor(data)
    }

    async function alterarCorretor(data: any) {
        data.documentoFederal = docFederal
        return await editarCorretor(data)
    }

    return (
        <>
            {show &&
                <div>
                    <div className="fixed inset-0 flex md:items-center justify-center z-50 ">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg shadow-lg max-w-3xl md:w-full mx-2 my-2">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {!isEdit ? `Criar Corretor` : `Editar Corretor`}
                                </h3>
                                <button type="button" onClick={handleCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Fechar modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5" onSubmit={handleSubmit(confirmarRegistro)} >
                                <div className="grid gap-4 mb-4 grid-cols-2 pb-4">
                                    {isEdit &&
                                        <>
                                            <div className="hidden">
                                                <input
                                                    {...register('codigo')}
                                                    defaultValue={corretor && corretor.codigo}
                                                    type="text"
                                                    name="codigo"
                                                    id="codigo"
                                                />
                                            </div>
                                        </>
                                    }
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('nome')}
                                            defaultValue={corretor && corretor.nome}
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
                                            defaultValue={corretor && corretor.email}
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
                                            maxLength={18}
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
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="tipoPessoa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo Pessoa <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('tipoPessoa')}
                                            defaultValue={corretor !== undefined ? corretor.tipoPessoa : "0"}
                                            id="tipoPessoa"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value={0}>Selecione</option>
                                            {Object.values(TipoPessoa).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToTipoPessoaEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="tipoCorretor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo Corretor <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('tipoCorretor')}
                                            defaultValue={corretor !== undefined ? corretor.tipoCorretor : "0"}
                                            id="tipoCorretor"
                                            name="tipoCorretor"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value={0}>Selecione</option>
                                            {Object.values(TipoCorretor).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToTipoCorretorEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="situacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Situação <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('situacao')}
                                            defaultValue={corretor !== undefined ? corretor.situacao : 0}
                                            id="situacao"
                                            name="situacao"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value={0}>Selecione</option>
                                            {Object.values(Situacao).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToSituacaoEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                                        <input
                                            {...register('empresa')}
                                            defaultValue={corretor && corretor.empresa}
                                            type="text"
                                            name="empresa"
                                            id="empresa"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Digite a empresa"
                                        />
                                    </div>
                                </div>
                                {errorBack && <div className="text-red-500 text-center">{errorBack}</div>}
                                <div className='flex justify-end'>
                                    <button type="button" onClick={handleCloseModal} className="mr-2 bg-gray-100 border border-gray-300 text-gray-700 font-semibold rounded-md py-2 px-4 transition duration-500 ease select-none hover:bg-gray-200 focus:outline-none focus:shadow-outline">
                                        Cancelar
                                    </button>
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

export default ModalCorretores;
