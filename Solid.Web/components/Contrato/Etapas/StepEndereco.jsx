import React from "react";
import CPFInput from "../../Form/CPFInput";
import { TipoLocacao } from "../../../constants/enums";
import { ToTipoLocacaoEnum } from "../../../extensions/EnumExtension";

const StepEndereco = ({ handleInputChange, formData }) => {
    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                Quais são as informações da Locação?
            </label>
            <p className="text-black-500 mt-2 mb-6">
                Preencha os dados referente a localidade da locação.
            </p>

            <form>
                <div className="p-6.5 w-4/5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locacao.tipoLocacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo Locação</label>
                            <select id="locacao.tipoLocacao" value={formData.locacao.tipoLocacao} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                <option value={0}>Selecione</option>
                                {Object.values(TipoLocacao).map((tipo, index) => (
                                    <option key={index} value={tipo}>{ToTipoLocacaoEnum(tipo)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locacao.rua" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rua</label>
                            <input value={formData.locacao.rua} type="text" id="locacao.rua" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locacao.numero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número {formData.locacao.tipoLocacao == 1 ? '(Ex: 102 - Número Apartamento)' : '(Ex: 102)'}</label>
                            <input value={formData.locacao.numero} type="text" id="locacao.numero" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locacao.bairro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                            <input value={formData.locacao.bairro} type="text" id="locacao.bairro" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locacao.cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                            <input value={formData.locacao.cidade} type="text" id="locacao.cidade" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locacao.estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado Ex: SC</label>
                            <input value={formData.locacao.estado} type="text" id="locacao.estado" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locacao.inscricaoImobiliaria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inscrição Imobiliária</label>
                            <input value={formData.locacao.inscricaoImobiliaria} type="text" id="locacao.inscricaoImobiliaria" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default StepEndereco;
