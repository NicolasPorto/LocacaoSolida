import { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { TipoValor } from "../../constants/enums";
import { ToTipoValorEnum } from "../../extensions/EnumExtension";
import { ValorFixoContext } from "../../context/ValorFixoContext";

import Money from "../Forms/Input/Money";

const ModalValorFixo = ({ visivel, valorFixo, onClose }: any) => {
    const { inserirValorFixo, editarValorFixo, limparErro, error } = useContext(ValorFixoContext)
    const [show, setShowModal] = useState(false)
    const [errorBack, setErrorBack] = useState<string | undefined>(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [valor, setValor] = useState(0);
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            codigo: valorFixo?.codigo || '',
            nome: valorFixo?.nome || '',
            valor: valorFixo?.valor || 0,
            porcentagemValor: valorFixo?.porcentagemValor || 0,
            tipoValor: valorFixo?.tipoValor || 0
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
        console.log(valorFixo)
        if (valorFixo !== undefined) {
            setIsEdit(true);
            reset(valorFixo);
            setValor(valorFixo?.valor);
        } else {
            limparValores();
            setIsEdit(false);
        }
    }, [valorFixo, reset]);

    const handleCloseModal = () => {
        setShowModal(false);
        limparValores();
        onClose();
    };

    const limparValores = () => {
        setValor(0);
        reset({
            codigo: '',
            nome: '',
            valor: 0,
            porcentagemValor: 0,
            tipoValor: 0
        });
    };

    async function confirmarRegistro(data: any) {
        if (!isEdit) {
            const response = await criarValor(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        } else {
            const response = await alterarValor(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        }
    }

    async function criarValor(data: any) {
        return await inserirValorFixo(data)
    }

    async function alterarValor(data: any) {
        return await editarValorFixo(data)
    }

    useEffect(() => {
        setValue('valor', valor);
    }, [valor, setValue]);

    return (
        <>
            {show &&
                <div className="fixed inset-0 overflow-y-auto z-999">
                    <div className="fixed inset-0 flex md:items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg shadow-lg max-w-3xl md:w-full mx-2 my-2 dark:border-strokedark dark:bg-boxdark">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {!isEdit ? 'Cadastrar Valor Fixo' : 'Editar Valor Fixo'}
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
                                                defaultValue={valorFixo && valorFixo.codigo}
                                                type="hidden"
                                            />
                                        </>
                                    }
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('nome')}
                                            type="text"
                                            name="nome"
                                            id="nome"
                                            className="dark:bg-form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 border-perso block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:border-perso-50"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="valor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor <span style={{ color: 'red' }}>*</span></label>
                                        <Money
                                            name="valor"
                                            id="valor"
                                            className="dark:bg-form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 border-perso block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:border-perso"
                                            placeholder="R$ 0,00"
                                            value={valor}
                                            onChange={setValor}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="porcentagemValor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Porcentagem <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('porcentagemValor')}
                                            type="number"
                                            name="porcentagemValor"
                                            id="porcentagemValor"
                                            className="dark:bg-form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 border-perso block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:border-perso"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="situacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Situação <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('tipoValor')}
                                            defaultValue={valorFixo !== undefined ? valorFixo.tipoValor : 0}
                                            id="tipoValor"
                                            name="tipoValor"
                                            className="dark:bg-form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 border-perso block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:border-perso"
                                        >
                                            <option value={0} disabled>Selecione</option>
                                            {Object.values(TipoValor).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToTipoValorEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {errorBack && <div className="text-red-500 text-center">{errorBack}</div>}
                                <div className='flex justify-end'>
                                    <button type="button" onClick={handleCloseModal} className="text-white bg-cancelamento border-cancelamento focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="text-white bg-primary border-perso focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
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

export default ModalValorFixo;
