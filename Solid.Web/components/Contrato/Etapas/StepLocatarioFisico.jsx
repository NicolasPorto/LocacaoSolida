import React from "react";
import CPFInput from "../../Form/CPFInput";
import { EstadoCivil } from "../../../constants/enums";
import { ToEstadoCivilEnum } from "../../../extensions/EnumExtension";

const StepLocatarioFisico = ({ handleInputChange, formData }) => {
    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                Quais são as informações do Locatário (Pessoa Física)?
            </label>
            <p className="text-black-500 mt-2 mb-6">
                O Locatário é a pessoa que alugará o imóvel.
            </p>

            <form>
                <div className="p-6.5 w-4/5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Completo</label>
                            <input value={formData.locatario.nome} type="text" id="locatario.nome" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.nacionalidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nacionalidade</label>
                            <input value={formData.locatario.nacionalidade} type="text" id="locatario.nacionalidade" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.estadoCivil" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado Civil</label>
                            <select id="locatario.estadoCivil" value={formData.locatario.estadoCivil} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                <option value={0}>Selecione</option>
                                {Object.values(EstadoCivil).map((tipo, index) => (
                                    <option key={index} value={tipo}>{ToEstadoCivilEnum(tipo)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                            <CPFInput value={formData.locatario.cpf} id="locatario.cpf" name="locatario.cpf" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input value={formData.locatario.email} type="text" id="locatario.email" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.profissao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profissão</label>
                            <input value={formData.locatario.profissao} type="text" id="locatario.profissao" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.endereco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço Completo</label>
                            <input value={formData.locatario.endereco} type="text" id="locatario.endereco" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locatario.cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                            <input value={formData.locatario.cidade} type="text" id="locatario.cidade" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default StepLocatarioFisico;
