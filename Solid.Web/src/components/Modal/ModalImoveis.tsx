import { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { buscarEnderecoPorCep } from '../../services/viaCep';
import { ImovelContext } from "../../context/ImovelContext";
import { SituacaoImovel, TipoImovel } from "../../constants/enums";
import { ToTipoImovelEnum, ToTipoSituacaoImovelEnum } from "../../extensions/EnumExtension";

const ModalImoveis = ({ visivel, imovel, onClose, comboParte }: any) => {
    const { inserirImovel, editarImovel, limparErro, error } = useContext(ImovelContext)
    const [show, setShowModal] = useState(false)
    const [errorBack, setErrorBack] = useState<string | undefined>(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            codigo: imovel?.codigo || '',
            codigoLocador: imovel?.codigoLocador || '',
            tipoImovel: imovel?.tipoImovel || 0,
            cep: imovel?.cep || '',
            logradouro: imovel?.logradouro || '',
            numeroLogradouro: imovel?.numeroLogradouro || '',
            cidade: imovel?.localidade || '',
            bairro: imovel?.bairro || '',
            complemento: imovel?.complemento || '',
            inscricaoImobiliaria: imovel?.inscricaoImobiliaria || '',
            situacao: imovel?.situacao || 0
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

    useEffect(() => {
        if (imovel !== undefined) {
            setIsEdit(true);
            reset(imovel);
            setCep(imovel.cep);
        } else {
            limparValores();
            setIsEdit(false);
        }
    }, [imovel, reset]);

    const handleCloseModal = () => {
        setShowModal(false);
        limparValores();
        onClose();
    };

    const limparValores = () => {
        setCep('');
        setEndereco({ uf: '', localidade: '', bairro: '', logradouro: '', cep: '', complemento: '' });
        reset({
            codigo: '',
            codigoLocador: '',
            tipoImovel: 0,
            cep: '',
            logradouro: '',
            numeroLogradouro: '',
            cidade: '',
            bairro: '',
            complemento: '',
            inscricaoImobiliaria: '',
            situacao: 0
        });
    };

    async function confirmarRegistro(data: any) {
        if (!isEdit) {
            const response = await criarImovel(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        } else {
            const response = await alterarImovel(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        }
    }

    async function criarImovel(data: any) {
        return await inserirImovel(data)
    }

    async function alterarImovel(data: any) {
        return await editarImovel(data)
    }

    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState({ uf: '', localidade: '', bairro: '', logradouro: '', cep: '', complemento: '' });

    const buscarEndereco = async () => {
        try {
            const data = await buscarEnderecoPorCep(cep.replace(/\D/g, ''));
            setEndereco(data);
            setValue('cidade', data.localidade);
            setValue('bairro', data.bairro);
            setValue('logradouro', data.logradouro);
        } catch (error) {
            setErrorBack("Endereço não encontrado.")
        }
    };

    useEffect(() => {
        if (cep.length === 8 && endereco && endereco.cep !== cep && imovel?.cep !== cep) {
            buscarEndereco();
        }
    }, [cep, endereco, setValue]);

    const handleCepChange = (e: any) => {
        setCep(e.target.value);
    };

    return (
        <>
            {show &&
                <div className="fixed inset-0 overflow-y-auto z-999">
                    <div className="fixed inset-0 flex md:items-center justify-center z-50 ">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg shadow-lg max-w-3xl md:w-full mx-2 my-2">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {!isEdit ? 'Criar Imóvel' : 'Editar Imóvel'}
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
                                            <input
                                                {...register('codigo')}
                                                defaultValue={imovel && imovel.codigo}
                                                type="hidden"
                                            />
                                        </>
                                    }
                                    <div className="col-span-2">
                                        <label htmlFor="codigoLocador" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Locador <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('codigoLocador')}
                                            defaultValue={imovel !== undefined ? imovel.codigoLocador : ""}
                                            id="codigoLocador"
                                            name="codigoLocador"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="" disabled>Selecione </option>
                                            {comboParte.map((parte: any, index: any) => (
                                                <option key={index} value={parte.codigo}>{parte.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="situacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo do Imóvel <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('tipoImovel')}
                                            defaultValue={imovel !== undefined ? imovel.tipoImovel : 0}
                                            id="tipoImovel"
                                            name="tipoImovel"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value={0}>Selecione</option>
                                            {Object.values(TipoImovel).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToTipoImovelEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="cep" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('cep')}
                                            maxLength={8}
                                            type="text"
                                            name="cep"
                                            id="cep"
                                            value={cep}
                                            onChange={handleCepChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="_____-___"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('cidade')}
                                            type="text"
                                            name="cidade"
                                            id="cidade"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('bairro')}
                                            type="text"
                                            name="bairro"
                                            id="bairro"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="numeroLogradouro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('numeroLogradouro')}
                                            type="number"
                                            name="numeroLogradouro"
                                            id="numeroLogradouro"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="logradouro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logradouro <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('logradouro')}
                                            type="text"
                                            name="logradouro"
                                            id="logradouro"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="inscricaoImobiliaria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inscrição Imobiliária</label>
                                        <input
                                            {...register('inscricaoImobiliaria')}
                                            type="text"
                                            name="inscricaoImobiliaria"
                                            id="inscricaoImobiliaria"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="situacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Situação <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('situacao')}
                                            defaultValue={imovel !== undefined ? imovel.situacao : 0}
                                            id="situacao"
                                            name="situacao"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value={0} disabled>Selecione</option>
                                            {Object.values(SituacaoImovel).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToTipoSituacaoImovelEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="complemento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                                        <input
                                            {...register('complemento')}
                                            type="text"
                                            name="complemento"
                                            id="complemento"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                </div>
            }
        </>
    )
}

export default ModalImoveis;
