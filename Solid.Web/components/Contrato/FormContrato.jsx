import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import CheckBoxGroup from "../Form/CheckBoxGroup";
import ButtonStep from "../misc/ButtonStep";
import ButtonStepBack from "../misc/ButtonStepBack";

const optionsCheckBox = [
    { id: 'pessoaF', label: 'Pessoa Física' },
    { id: 'pessoaJ', label: 'Pessoa Jurídica' }
];

const FormContrato = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const previousStep = () => setStep(step - 1);

    return (
        <>
            <div className="mt-24 mx-auto w-full bg-white sm:p-8 shadow-person-md">
                <div className="max-w-screen-xl px-8 mx-auto">
                    <ProgressBar valor={4} />
                    <div className="mt-8 mb-8">
                        {step === 1 && <StepUm />}
                        {step === 2 && <StepDois />}
                    </div>
                    <div className="flex justify-end">
                        {step > 1 && <ButtonStepBack onClick={previousStep}>Voltar</ButtonStepBack>}
                        <ButtonStep onClick={nextStep}>Continuar</ButtonStep>
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

const StepDois = () => {
    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                O Proprietário do imóvel, é uma pessoa física ou jurídica?
            </label>
            <p className="text-black-500 mt-2 mb-6">
                Pessoa física possui CPF, um ser humano, e Pessoa jurídica é toda entidade com CNPJ.
            </p>
        </>
    )
}


export default FormContrato;