import React, { useEffect, useState } from "react";
import { TipoPessoa } from "../../constants/enums";
import ProgressBar from "./ProgressBar";
import StepLocador from "./Etapas/StepLocador";
import StepLocadorFisico from "./Etapas/StepLocadorFisico";
import StepLocadorJuridico from "./Etapas/StepLocadorJuridico";
import StepLocatario from "./Etapas/StepLocatario";
import StepLocatarioFisico from "./Etapas/StepLocatarioFisico";
import ButtonStep from "../Form/ButtonStep";
import ButtonStepBack from "../Form/ButtonStepBack";

const progressValues = [4, 8, 12, 16, 21];

const FormContrato = ({ handleSalvarForm }) => {
    const [step, setStep] = useState(1);
    const [progressBar, setProgressBar] = useState(4);
    const [tipoProprietario, setTipoProprietario] = useState(TipoPessoa.Fisica);
    const [tipoLocatario, setTipoLocatario] = useState(TipoPessoa.Fisica);
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
        },
        locatario: {
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
        if (step === 1 && tipoProprietario === TipoPessoa.Fisica) {
            setStep(step + 1);
            setProgressBar(progressValues[step]);
            return;
        }

        if (step === 1 && tipoProprietario === TipoPessoa.Juridica) {
            setStep(step + 2);
            setProgressBar(progressValues[step]);
            return;
        }

        if (step === 2) {
            setStep(step + 2);
            setProgressBar(progressValues[step]);
            return;
        }

        setStep(step + 1);
        setProgressBar(progressValues[step]);
    }

    const previousStep = () => {
        if (step === 4 && tipoProprietario === TipoPessoa.Fisica) {
            setStep(step - 2);
            setProgressBar(progressValues[step - 3]);
            return;
        }

        if (step === 3) {
            setStep(step - 2);
            setProgressBar(progressValues[step - 3]);
            return;
        }

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

    const handleTipoProprietario = (tipoPessoa) => {
        setTipoProprietario(tipoPessoa)
    }

    const handleTipoLocatario = (tipoPessoa) => {
        setTipoLocatario(tipoPessoa)
    }

    return (
        <>
            <div className="mt-24 mx-auto w-full bg-white sm:p-8 shadow-person-md">
                <div className="max-w-screen-xl px-8 mx-auto">
                    <ProgressBar valor={progressBar} />
                    <div className="mt-8 mb-8">
                        {step === 1 && <StepLocador handleTipoProprietario={handleTipoProprietario} />}
                        {step === 2 && <StepLocadorFisico handleInputChange={handleInputChange} formData={formData} />}
                        {step === 3 && <StepLocadorJuridico />}

                        {step === 4 && <StepLocatario handleTipoLocatario={handleTipoLocatario} />}
                        {step === 5 && <StepLocatarioFisico handleInputChange={handleInputChange} formData={formData} />}
                    </div>
                    <div className="flex justify-end">
                        {step > 1 && <ButtonStepBack onClick={previousStep}>Voltar</ButtonStepBack>}
                        {step < 10 && <ButtonStep onClick={nextStep}>Continuar</ButtonStep>}
                        {step === 10 && <button onClick={handleSubmit}>Enviar</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormContrato;