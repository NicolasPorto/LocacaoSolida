import React from "react";
import CPFInput from "../../Form/CPFInput";
import { EstadoCivil } from "../../../constants/enums";
import { ToEstadoCivilEnum } from "../../../extensions/EnumExtension";

const StepLocadorFisico = ({ handleInputChange, formData }) => {
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
                            <label htmlFor="locador.estadoCivil" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado Civil</label>
                            <select id="locador.estadoCivil" value={formData.locador.estadoCivil} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                                <option value={0}>Selecione</option>
                                {Object.values(EstadoCivil).map((tipo, index) => (
                                    <option key={index} value={tipo}>{ToEstadoCivilEnum(tipo)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                            <CPFInput value={formData.locador.cpf} id="locador.cpf" name="locador.cpf" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input value={formData.locador.email} type="text" id="locador.email" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.profissao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profissão</label>
                            <input value={formData.locador.profissao} type="text" id="locador.profissao" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.endereco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço Completo</label>
                            <input value={formData.locador.endereco} type="text" id="locador.endereco" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="locador.cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                            <input value={formData.locador.cidade} type="text" id="locador.cidade" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default StepLocadorFisico;
