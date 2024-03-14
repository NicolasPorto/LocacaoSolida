import React, { useState, useContext, useEffect } from 'react';
import { TipoParte } from "../../../constants/enums";
import { ParteEnvolvidaContext } from "../../../context/ParteEnvolvidaContext";

const ComboLocador: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [comboLocadores, setComboLocadores] = useState([])
    const { obterComboParteEnvolvida } = useContext(ParteEnvolvidaContext)

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    useEffect(() => {
        obterComboParteEnvolvida(TipoParte.Locador).then(response => {
            setComboLocadores(response)
        })
    }, [])

    return (
        <div className="w-full xl:w-1/2">
            <label htmlFor="codigoLocador" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Locador <span style={{ color: 'red' }}>*</span></label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    value={selectedOption}
                    onChange={(e) => {
                        setSelectedOption(e.target.value);
                        changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                >
                    <option value="" disabled className="text-body dark:text-bodydark">
                        Selecione
                    </option>
                    {comboLocadores.map((locador: any, index: any) => (
                        <option className="text-body dark:text-bodydark" key={index} value={locador.codigo}>{locador.nome}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ComboLocador;
