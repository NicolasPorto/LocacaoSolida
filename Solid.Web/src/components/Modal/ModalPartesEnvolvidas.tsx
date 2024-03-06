import { EstadoCivil } from '../../constants/enums';
import { useState, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { ToEstadoCivilEnum } from "../../extensions/EnumExtension";
import { ParteEnvolvidaContext } from '../../context/ParteEnvolvidaContext';
import { FormatarDocumentoFederal } from '../../extensions/FormatacaoExtension';
import { FormatarNumeroCelular } from '../../extensions/FormatacaoExtension';

import { buscarEnderecoPorCep } from '../../services/viaCep';
import SwitcherThree from '../Switchers/SwitcherThree';
import DocumentoFederal from '../Forms/Input/DocumentoFederal';
import Telefone from '../Forms/Input/Telefone';
import Money from '../Forms/Input/Money';

const ModalPartesEnvolvidas = ({ visivel, parteEnvolvida, onClose, nomeParte, tipoParte }: any) => {
    const { inserirParteEnvolvida, editarParteEnvolvida, limparErro, error } = useContext(ParteEnvolvidaContext)
    const [show, setShowModal] = useState(false)
    const [errorBack, setErrorBack] = useState<string | undefined>(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [docFederal, setDocFederal] = useState('');
    const [docConjuge, setDocConjuge] = useState('');
    const [telefone, setTelefone] = useState('');
    const [valorRenda, setValorRenda] = useState(0);
    const [possuiConjuge, setPossuiConjuge] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            codigo: parteEnvolvida?.codigo || '',
            nome: parteEnvolvida?.nome || '',
            email: parteEnvolvida?.email || '',
            cpf: parteEnvolvida?.cpf || '',
            numeroCelular: parteEnvolvida?.numeroCelular || '',
            cep: parteEnvolvida?.cep || '',
            cidade: parteEnvolvida?.localidade || '',
            bairro: parteEnvolvida?.bairro || '',
            logradouro: parteEnvolvida?.logradouro || '',
            numeroLogradouro: parteEnvolvida?.numeroLogradouro || '',
            nacionalidade: parteEnvolvida?.nacionalidade || '',
            estadoCivil: parteEnvolvida?.estadoCivil || 0,
            profissao: parteEnvolvida?.profissao || '',
            empresa: parteEnvolvida?.empresa || '',
            valorRenda: parteEnvolvida?.valorRenda || 0,
            conjuge: parteEnvolvida?.conjuge || '',
            cpfConjuge: parteEnvolvida?.cpfConjuge || '',
            tipoParte: parteEnvolvida?.tipoParte || '',
            possuiConjuge: parteEnvolvida?.possuiConjuge || false,
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
        if (parteEnvolvida !== undefined) {
            setIsEdit(true);
            reset(parteEnvolvida);
            setValue('cpf', FormatarDocumentoFederal(parteEnvolvida?.cpf));
            setValue('numeroCelular', FormatarNumeroCelular(parteEnvolvida?.numeroCelular));
            setPossuiConjuge(parteEnvolvida.possuiConjuge);
            setValorRenda(parteEnvolvida.valorRenda);
            setDocFederal(parteEnvolvida.cpf);
            setTelefone(parteEnvolvida.numeroCelular);
            setCep(parteEnvolvida.cep);

            if (parteEnvolvida.possuiConjuge) {
                setDocConjuge(parteEnvolvida?.cpfConjuge)
                setValue('cpfConjuge', FormatarDocumentoFederal(parteEnvolvida?.cpfConjuge));
            }
        } else {
            limparValores();
            setIsEdit(false);
        }
    }, [parteEnvolvida, reset]);

    const handleCloseModal = () => {
        setShowModal(false);
        limparValores();
        onClose();
    };

    const limparValores = () => {
        setTelefone('');
        setDocFederal('');
        setDocConjuge('');
        setValorRenda(0);
        setPossuiConjuge(false);
        setCep('');
        setEndereco({ uf: '', localidade: '', bairro: '', logradouro: '', cep: '', complemento: '' });
        reset({
            codigo: '',
            nome: '',
            email: '',
            cpf: '',
            numeroCelular: '',
            cep: '',
            cidade: '',
            bairro: '',
            logradouro: '',
            numeroLogradouro: '',
            nacionalidade: '',
            estadoCivil: 0,
            profissao: '',
            empresa: '',
            valorRenda: 0,
            conjuge: '',
            cpfConjuge: '',
            tipoParte: '',
            possuiConjuge: false,
        });
    };

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
        data.tipoParte = tipoParte
        return await inserirParteEnvolvida(data)
    }

    async function alterarParte(data: any) {
        return await editarParteEnvolvida(data)
    }

    function possuiConjugeChange() {
        setPossuiConjuge(!possuiConjuge)
        setValue('possuiConjuge', !possuiConjuge);
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
        if (cep.length === 8 && endereco && endereco.cep !== cep && parteEnvolvida?.cep !== cep) {
            buscarEndereco();
        }
    }, [cep, endereco, setValue]);

    const handleCepChange = (e: any) => {
        setCep(e.target.value);
    };

    useEffect(() => {
        setValue('valorRenda', valorRenda);
    }, [valorRenda, setValue]);

    return (
        <>
            {show &&
                <div className="fixed inset-0 overflow-y-auto z-999">
                    <div className="fixed inset-0 flex md:items-center justify-center z-50 ">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg shadow-lg max-w-3xl md:w-full mx-2 my-2 dark:border-strokedark dark:bg-boxdark">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {!isEdit ? `Cadastrar ${nomeParte}` : `Editar ${nomeParte}`}
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
                                                defaultValue={parteEnvolvida && parteEnvolvida.codigo}
                                                type="hidden"
                                            />
                                        </>
                                    }
                                    <input
                                        {...register('tipoParte')}
                                        defaultValue={tipoParte}
                                        type="hidden"
                                    />
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('nome')}
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
                                            {...register('cidade')}
                                            type="text"
                                            name="cidade"
                                            id="cidade"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                                        <input
                                            {...register('bairro')}
                                            type="text"
                                            name="bairro"
                                            id="bairro"
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="numeroLogradouro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número</label>
                                        <input
                                            {...register('numeroLogradouro')}
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
                                            {...register('logradouro')}
                                            type="text"
                                            name="logradouro"
                                            id="logradouro"
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="nacionalidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nacionalidade <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            {...register('nacionalidade')}
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
                                            defaultValue={parteEnvolvida !== undefined ? parteEnvolvida.estadoCivil : 0}
                                            id="estadoCivil"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value={0} disabled>Selecione</option>
                                            {Object.values(EstadoCivil).map((tipo, index) => (
                                                <option key={index} value={tipo}>{ToEstadoCivilEnum(tipo)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="profissao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profissão</label>
                                        <input
                                            {...register('profissao')}
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
                                            name="valorRenda"
                                            id="valorRenda"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="R$ 0,00"
                                            value={valorRenda}
                                            onChange={setValorRenda}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="possuiConjuge" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Possui cônjuge?</label>
                                        <SwitcherThree ativo={possuiConjuge} onToggle={possuiConjugeChange} />
                                    </div>
                                    {possuiConjuge &&
                                        <>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="conjuge" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cônjuge <span style={{ color: 'red' }}>*</span></label>
                                                <input
                                                    {...register('conjuge')}
                                                    type="text"
                                                    name="conjuge"
                                                    id="conjuge"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Digite o nome"
                                                    autoComplete="on"
                                                    required={possuiConjuge}
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="cpfConjuge" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF Cônjuge <span style={{ color: 'red' }}>*</span></label>
                                                <DocumentoFederal
                                                    register={register}
                                                    name="cpfConjuge"
                                                    id="cpfConjuge"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="___.___.___-__"
                                                    value={docConjuge}
                                                    onChange={setDocConjuge}
                                                    disabled={false}
                                                    required={possuiConjuge}
                                                    maxLength={14}
                                                />
                                            </div>
                                        </>
                                    }
                                </div>
                                {errorBack && <div className="text-red-500 text-center">{errorBack}</div>}
                                <div className='flex justify-end'>
                                    <button type="button" onClick={handleCloseModal} className="mr-2 bg-gray-100 border border-gray-300 text-gray-700 font-semibold rounded-md py-2 px-4 transition duration-500 ease select-none hover:bg-gray-200 focus:outline-none focus:shadow-outline">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

export default ModalPartesEnvolvidas;
