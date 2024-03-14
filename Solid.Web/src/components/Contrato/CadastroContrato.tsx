import { useState } from 'react';
import EditorContrato from '../../components/Contrato/Editor';
import StepperContrato from '../Stepper/StepperContrato';
import FormContrato from '../../components/Forms/Contrato/FormContrato';

const CadastroContrato = ({ retrocederEtapa }: any) => {
    const [contractText, setContractText] = useState<string>('');
    const [etapa, setEtapa] = useState(1);

    const handleContractChange = (value: string) => {
        setContractText(value);
    };

    const avancarEtapaCadastro = () => {
        setEtapa(etapa + 1);
    };

    const retrocederEtapaCadastro = () => {
        if (etapa === 1) {
            retrocederEtapa()
        } else {
            setEtapa(etapa - 1);

        }
    }

    return (
        <>
            <StepperContrato etapa={etapa} />
            {etapa === 1 &&
                <div>
                    <FormContrato />
                </div>
            }
            {etapa === 2 &&
                <EditorContrato initialValue={contractText} onChange={handleContractChange} />
            }
            <div className='flex justify-end'>
                <button type="button" onClick={retrocederEtapaCadastro} className="text-white bg-primary border-perso w-28 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Voltar
                </button>
                <button type="button" onClick={avancarEtapaCadastro} className="text-white bg-primary border-perso w-28 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Avançar
                </button>
            </div>
        </>
    );
};

export default CadastroContrato;
