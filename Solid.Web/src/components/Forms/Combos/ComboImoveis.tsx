import React, { useState, useContext, useEffect } from 'react';
import { ImovelContext } from '../../../context/ImovelContext';

const ComboImoveis: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [comboImoveis, setComboImoveis] = useState([])
    const { obterComboImoveis } = useContext(ImovelContext)

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    useEffect(() => {
        obterComboImoveis().then(response => {
            setComboImoveis(response)
        })
    }, [])

    function MontarDescricaoImovel(imovel: any) {
        return (imovel.logradouro + ' nº' + imovel.numeroLogradouro + ' - ' + imovel.bairro + ', ' + imovel.cidade + ', ' + imovel.cep)
    }

    return (
        <div className="w-full xl:w-1/2">
            <label htmlFor="codigoLocador" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imóvel <span style={{ color: 'red' }}>*</span></label>
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
                    {comboImoveis.map((imovel: any, index: any) => (
                        <option className="text-body dark:text-bodydark" key={index} value={imovel.codigo}>{MontarDescricaoImovel(imovel)}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ComboImoveis;