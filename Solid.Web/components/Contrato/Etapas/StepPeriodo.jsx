import React from "react";
import DataInput from "../../Form/DatePicker";

const StepPeriodo = ({ handleInputChange, formData }) => {
    return (
        <>
            <label className="text-2xl sm:text-3xl font-medium text-black-600 leading-normal mx-auto">
                Informe o período da locação
            </label>
            <p className="text-black-500 mt-2 mb-6">
                Período em que a locação estará em vigor.
            </p>

            <form>
                <div className="p-6.5 w-4/5">
                    <div className="mb-4.5 flex flex-col xl:flex-row">
                        <div className="mr-5 mb-5">
                            <label htmlFor="locacao.dtInicio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data Inicio</label>
                            <DataInput id="locacao.dtInicio" name="locacao.dtInicio"/>
                        </div>
                        <div>
                            <label htmlFor="locacao.dtFim" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data Fim</label>
                            <DataInput id="locacao.dtFim" name="locacao.dtFim"/>
                        </div>
                    </div>
                </div>
                <div className="p-6.5 w-4/5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                    </div>
                </div>
            </form>
        </>
    );
};

export default StepPeriodo;
