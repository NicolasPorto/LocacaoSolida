const StepperContrato = ({ etapa }: any) => {
    return (
        <>
            <ol className="flex items-center w-full space-y-4 justify-between sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
                    <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500 ">
                        1
                    </span>
                    <span className="">
                        <h3 className="font-medium leading-tight">Informações</h3>
                        <p className="text-sm">Detalhes</p>
                    </span>
                </li>
                <hr className={`w-full my-0 border-gray-300 dark:border-gray-600 ${etapa > 1 ? 'text-blue-600 dark:text-blue-500' : ''}`} />
                <li className={`flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse ${etapa > 1 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                    <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        2
                    </span>
                    <span>
                        <h3 className="font-medium leading-tight">Revisão</h3>
                        <p className="text-sm">Detalhes</p>
                    </span>
                </li>
                <hr className={`w-full my-0 border-gray-300 dark:border-gray-600 ${etapa === 3 ? 'text-blue-600 dark:text-blue-500' : ''}`} />
                <li className={`flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse ${etapa === 3 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                    <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        3
                    </span>
                    <span>
                        <h3 className="font-medium leading-tight">Finalizar</h3>
                        <p className="text-sm">Detalhes</p>
                    </span>
                </li>
            </ol>
        </>
    );
};

export default StepperContrato;
