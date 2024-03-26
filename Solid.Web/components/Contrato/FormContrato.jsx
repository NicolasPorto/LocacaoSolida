import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import CheckBoxGroup from "../Form/CheckBoxGroup";
import ButtonStep from "../misc/ButtonStep";
import ButtonStepBack from "../misc/ButtonStepBack";
import CPFInput from "../Form/CPFInput";
import { EstadoCivil } from "../../constants/enums";
import { ToEstadoCivilEnum } from "../../extensions/EnumExtension";

const optionsCheckBox = [
    { id: 'pessoaF', label: 'Pessoa Física' },
    { id: 'pessoaJ', label: 'Pessoa Jurídica' }
];

const progressValues = [4, 8, 12, 16];

const FormContrato = ({ handleSalvarForm }) => {
    const [step, setStep] = useState(1);
    const [progressBar, setProgressBar] = useState(4);
    const [formData, setFormData] = useState({
        locador: {
            nome: '',
            nacionalidade: '',
            estadoCivil: 0,
            cpf: '',
            email: '',
            profissao: '',
            endereco: '',
            cidade: ''
        }
    });

    useEffect(() => {
        handleSalvarForm(formData);
    }, [formData]);

    const nextStep = () => {
        setStep(step + 1);
        setProgressBar(progressValues[step]);
    }

    const previousStep = () => {
        setStep(step - 1);
        setProgressBar(progressValues[step - 2]);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const [group, field] = id.split('.');
        setFormData((prevData) => ({
            ...prevData,
            [group]: {
                ...prevData[group],
                [field]: value
            }
        }));
    };

    const handleSubmit = () => {
        console.log(formData);
    }

    return (
        <>
            <div className="mt-24 mx-auto w-full bg-white sm:p-8 shadow-person-md">
                <div className="max-w-screen-xl px-8 mx-auto">
                    <ProgressBar valor={progressBar} />
                    <div className="mt-8 mb-8">
                        {step === 1 && <StepUm />}
                        {step === 2 && <StepPessoaFisica handleInputChange={handleInputChange} formData={formData} />}
                        {step === 3 && <StepPessoaJuridica />}
                    </div>
                    <div className="flex justify-end">
                        {step > 1 && <ButtonStepBack onClick={previousStep}>Voltar</ButtonStepBack>}
                        {step < 3 && <ButtonStep onClick={nextStep}>Continuar</ButtonStep>}
                        {step === 3 && <button onClick={handleSubmit}>Enviar</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

const StepUm = () => {
    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                O Proprietário do imóvel, é uma pessoa física ou jurídica?
            </label>
            <p className="text-black-500 mt-2 mb-6">
                Pessoa física possui CPF, um ser humano, e Pessoa jurídica é toda entidade com CNPJ.
            </p>
            <div className="flex flex-col gap-5.5 p-6.5">
                <CheckBoxGroup options={optionsCheckBox} />
            </div>
        </>
    )
}

const StepPessoaFisica = ({ handleInputChange, formData }) => {
    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                Quais são as informações do Proprietário (Pessoa Física)?
            </label>
            <p className="text-black-500 mt-2 mb-6">
                O locador do imóvel que contempla no contrato.
            </p>

            <form>
                <div className="p-6.5 w-4/5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Completo</label>
                            <input value={formData.locador.nome} type="text" id="locador.nome" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.nacionalidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nacionalidade</label>
                            <input value={formData.locador.nacionalidade} type="text" id="locador.nacionalidade" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.profissao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profissão</label>
                            <input value={formData.locador.profissao} type="text" id="locador.profissao" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                            <CPFInput value={formData.locador.cpf} id="locador.cpf" name="locador.cpf" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.endereco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço Ex: (Rua - Nº, bairro)</label>
                            <input value={formData.locador.endereco} type="text" id="locador.endereco" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade Ex: (Cidade - Estado)</label>
                            <input value={formData.locador.cidade} type="text" id="locador.cidade" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>

                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input value={formData.locador.email} type="text" id="locador.email" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.estadoCivil" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado Civil</label>
                            <select
                                defaultValue={formData.locador.estadoCivil}
                                id="locador.estadoCivil"
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleInputChange}
                            >
                                <option value={0}>Selecione</option>
                                {Object.values(EstadoCivil).map((tipo, index) => (
                                    <option key={index} value={tipo}>{ToEstadoCivilEnum(tipo)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}


const StepPessoaJuridica = () => {
    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                Quais são as informações do Proprietário (Pessoa Jurídica)?
            </label>
            <p className="text-black-500 mt-2 mb-6">
                O locador do imovél que contempla no contrato.
            </p>
        </>
    )
}

export default FormContrato;