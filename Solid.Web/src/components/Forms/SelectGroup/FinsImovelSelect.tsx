import React, { useState } from 'react';
import { TipoFinsImovel } from "../../../constants/enums";
import { ToTipoFinsImovelEnum } from "../../../extensions/EnumExtension";

const FinsImovelSelect: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    return (
        <div className="w-full xl:w-1/2">
            <label htmlFor="tipoFins" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fins do imóvel <span style={{ color: 'red' }}>*</span></label>
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
                    {Object.values(TipoFinsImovel).map((tipo, index) => (
                        <option key={index} value={tipo} className="text-body text-black dark:text-white dark:text-bodydark">{ToTipoFinsImovelEnum(tipo)}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FinsImovelSelect;
