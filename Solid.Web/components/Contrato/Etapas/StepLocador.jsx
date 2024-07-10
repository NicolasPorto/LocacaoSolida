import React, { useState } from "react";
import { TipoPessoa } from "../../../constants/enums";

const StepLocador = ({ handleTipoProprietario }) => {
    const [isPFPicked, setIsPFPicked] = useState(true);
    const [isPJPicked, setIsPJPicked] = useState(false);

    const handlePFPick = () => {
        setIsPFPicked(true);
        setIsPJPicked(false);
        handleTipoProprietario(TipoPessoa.Fisica);
    };

    const handlePJPick = () => {
        setIsPFPicked(false);
        setIsPJPicked(true);
        handleTipoProprietario(TipoPessoa.Juridica);
    };

    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                O Proprietário do imóvel, é uma pessoa física ou jurídica?
            </label>
            <p className="text-black-500 mt-2 mb-6">
                Pessoa física possui CPF, um ser humano, e Pessoa jurídica é toda entidade com CNPJ.
            </p>
            <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                    <label className="flex cursor-pointer select-none items-center mt-2">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                onChange={handlePFPick}
                                checked={isPFPicked}
                            />
                            <div className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${isPFPicked && 'border-person-500'}`}>
                                <span className={`h-2.5 w-2.5 rounded-full bg-person-500`} />
                            </div>
                        </div>
                        Pessoa Física
                    </label>
                </div>

                <div>
                    <label className="flex cursor-pointer select-none items-center mt-2 text-gray-400">
                        <div className="relative">
                            <input
                                disabled
                                type="checkbox"
                                className="sr-only"
                                onChange={handlePJPick}
                                checked={isPJPicked}
                            />
                            <div className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${isPJPicked && 'border-person-500'}`}>
                                <span className={`h-2.5 w-2.5 rounded-full bg-transparent ${isPJPicked && '!bg-gray-500'}`} />
                            </div>
                        </div>
                        Pessoa Jurídica <label className="ml-2 text-person-500"> Em breve </label>
                    </label>
                </div>
            </div>
        </>
    )
}

export default StepLocador;