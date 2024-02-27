import { EstadoCivil } from '../../constants/enums';
import { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { ToEstadoCivilEnum } from "../../extensions/EnumExtension";
import { ParteEnvolvidaContext } from '../../context/ParteEnvolvidaContext';

import { buscarEnderecoPorCep } from '../../services/viaCep';
import SwitcherThree from '../Switchers/SwitcherThree';
import DocumentoFederal from '../Forms/Input/DocumentoFederal';
import Telefone from '../Forms/Input/Telefone';
import Money from '../Forms/Input/Money';

const ModalPartesEnvolvidas = ({ visivel, parteEnvolvida, onClose, nomeParte, tipoParte }: any) => {
    const { inserirParteEnvolvida, editarParteEnvolvida, error } = useContext(ParteEnvolvidaContext)
    const [show, setShowModal] = useState(false)
    const [errorBack, setErrorBack] = useState<string | undefined>(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [docFederal, setDocFederal] = useState('');
    const [docConjuge, setDocConjuge] = useState('');
    const [telefone, setTelefone] = useState('');
    const [valor, setValorRenda] = useState('');
    const [possuiConjuge, setPossuiConjuge] = useState(false);
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
        setValorRenda('')
        reset();
        onClose();
    }

    useEffect(() => {
        if (parteEnvolvida !== undefined) {
            setIsEdit(true);
            setDocFederal(parteEnvolvida.cpf)
            setTelefone(parteEnvolvida.numeroCelular)
            setValorRenda(parteEnvolvida.valorRenda)
        } else {
            setIsEdit(false);
        }
    }, [parteEnvolvida]);

    async function confirmarRegistro(data: any) {
        if (!isEdit) {
            const response = await criarParte(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        } else {
            const response = await alterarParte(data);
            if (response !== undefined) {
                handleCloseModal()
            }
        }
    }

    async function criarParte(data: any) {
        data.valorRenda = valor
        data.tipoParte = tipoParte
        return await inserirParteEnvolvida(data)
    }

    async function alterarParte(data: any) {
        data.documentoFederal = docFederal
        data.email = parteEnvolvida.email
        return await editarParteEnvolvida(data)
    }

    function possuiConjugeChange() {
        setPossuiConjuge(!possuiConjuge)
    }

    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState({ uf: '', localidade: '', bairro: '', logradouro: '', cep: '', complemento: '' });

    const buscarEndereco = async () => {
        try {
            const data = await buscarEnderecoPorCep(cep.replace(/\D/g, ''));
            setEndereco(data);
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    };

    useEffect(() => {
        if (cep.length === 8 && endereco && endereco.cep !== cep) {
            buscarEndereco();
        }
    }, [cep]);

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
                                    {!isEdit ? `Criar ${nomeParte}` : `Editar ${nomeParte}`}
                                </h3>
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
                                                    defaultValue={parteEnvolvida && parteEnvolvida.codigo}
                                                    type="text"
                                                    name="codigo"
                                                    id="codigo"
                                                />
                                            </div>

                                            <div className="hidden">
                                                <input
                                                    {...register('dtInclusao')}
                                                    defaultValue={parteEnvolvida && parteEnvolvida.dtInclusao}
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
                                            defaultValue={tipoParte}
                                            type="number"
                                            name="tipoParte"
                                            id="tipoParte"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('nome')}
                                            defaultValue={parteEnvolvida && parteEnvolvida.nome}
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
                                            defaultValue={parteEnvolvida && parteEnvolvida.email}
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
                                        <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF <span style={{ color: 'red' }}>*</span></label>
                                        <DocumentoFederal
                                            register={register}
                                            name="cpf"
                                            id="cpf"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="___.___.___-__"
                                            value={docFederal}
                                            onChange={setDocFederal}
                                            disabled={isEdit}
                                            maxLength={14}
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
                                        <label htmlFor="cep" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP</label>
                                        <input
                                            {...register('cep')}
                                            maxLength={8}
                                            defaultValue={parteEnvolvida && parteEnvolvida.cep}
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
                                        <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                                        <input
                                            {...register('cidade', { value: endereco.localidade })}
                                            defaultValue={parteEnvolvida && parteEnvolvida.cidade}
                                            type="text"
                                            name="cidade"
                                            value={endereco.localidade}
                                            id="cidade"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                                        <input
                                            {...register('bairro', { value: endereco.bairro })}
                                            defaultValue={parteEnvolvida && parteEnvolvida.bairro}
                                            type="text"
                                            name="bairro"
                                            value={endereco.bairro}
                                            id="bairro"
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="numeroLogradouro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número</label>
                                        <input
                                            {...register('numeroLogradouro')}
                                            defaultValue={parteEnvolvida && parteEnvolvida.numeroLogradouro}
                                            type="number"
                                            name="numeroLogradouro"
                                            id="numeroLogradouro"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder='Digite o número do logradouro'
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="logradouro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logradouro</label>
                                        <input
                                            {...register('logradouro', { value: endereco.logradouro })}
                                            defaultValue={parteEnvolvida && parteEnvolvida.logradouro}
                                            type="text"
                                            name="logradouro"
                                            id="logradouro"
                                            value={endereco.logradouro}
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="nacionalidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nacionalidade <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('nacionalidade')}
                                            defaultValue={parteEnvolvida && parteEnvolvida.nacionalidade}
                                            type="text"
                                            name="nacionalidade"
                                            id="nacionalidade"
                                            maxLength={50}
                                            required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="estadoCivil" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado Civil <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            {...register('estadoCivil')}
                                            defaultValue={parteEnvolvida !== undefined ? parteEnvolvida.estadoCivil : "0"}
                                            id="estadoCivil"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="0" disabled>Selecione</option>
                                            {Object.values(EstadoCivil).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToEstadoCivilEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="profissao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profissão</label>
                                        <input
                                            {...register('profissao')}
                                            defaultValue={parteEnvolvida && parteEnvolvida.profissao}
                                            type="text"
                                            name="profissao"
                                            id="profissao"
                                            maxLength={200}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                                        <input
                                            {...register('empresa')}
                                            defaultValue={parteEnvolvida && parteEnvolvida.empresa}
                                            type="text"
                                            name="empresa"
                                            id="empresa"
                                            maxLength={200}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="valorRenda" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Renda </label>
                                        <Money
                                            register={register}
                                            name="valorRenda"
                                            id="valorRenda"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="R$ 0,00"
                                            value={valor}
                                            onChange={setValorRenda}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="valorRenda" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Possui cônjuge?</label>
                                        <SwitcherThree ativo={possuiConjuge} onToggle={possuiConjugeChange} />
                                    </div>
                                    {possuiConjuge &&
                                        <>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="conjuge" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cônjuge <span style={{ color: 'red' }}>*</span></label>
                                                <input
                                                    {...register('conjuge')}
                                                    defaultValue={parteEnvolvida && parteEnvolvida.nome}
                                                    type="text"
                                                    name="conjuge"
                                                    id="conjuge"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Digite o nome"
                                                    autoComplete="on"
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="cpfconjuge" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF Cônjuge <span style={{ color: 'red' }}>*</span></label>
                                                <DocumentoFederal
                                                    register={register}
                                                    name="cpfconjuge"
                                                    id="cpfconjuge"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="___.___.___-__"
                                                    value={docConjuge}
                                                    onChange={setDocConjuge}
                                                    disabled={false}
                                                    maxLength={14}
                                                />
                                            </div>
                                        </>
                                    }
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

export default ModalPartesEnvolvidas;
