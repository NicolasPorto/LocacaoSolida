import ComboLocadores from "../Combos/ComboLocadores";
import ComboLocatarios from "../Combos/ComboLocatarios";
import ComboImoveis from "../Combos/ComboImoveis";
import ComboFiadores from "../Combos/ComboFiadores";
import DatePickerOne from "../DatePicker/DatePickerOne";
import FinsImovelSelect from "../SelectGroup/FinsImovelSelect";

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

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <ComboImoveis />
                                <ComboFiadores />
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row w-full">
                                <div className="w-full gap-6 flex">
                                    <DatePickerOne label={'Data Início'} />
                                    <DatePickerOne label={'Data Fim'} />
                                </div>
                                <div className="w-full">
                                    <FinsImovelSelect />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormContrato;
