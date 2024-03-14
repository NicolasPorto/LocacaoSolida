import { useState, useEffect, useContext } from "react";
import ComboLocadores from "../Combos/ComboLocadores";
import ComboLocatarios from "../Combos/ComboLocatarios";
import ComboImoveis from "../Combos/ComboImoveis";

const FormContrato = () => {
    return (
        <>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Sobre o contrato
                        </h3>
                    </div>
                    <form action="#">
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <ComboLocadores />
                                <ComboLocatarios />
                            </div>

                            <div className="mb-4.5">
                                <ComboImoveis/>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="Select subject"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Message
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Type your message"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormContrato;
