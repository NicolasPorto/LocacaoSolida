import HeadPagina from "../../components/Home/HeadPagina";
import FormContrato from "../../components/Contrato/FormContrato";
import MontagemContrato from "../../components/Contrato/MontagemContrato";
import { useState } from "react";

export default function GerarContrato() {
    const [data, setData] = useState({});

    const handleSalvarForm = (form) => {
        setData(form);
    };

    return (
        <>
            <HeadPagina title='LocaçãoSólida | Gerar' />
            <FormContrato handleSalvarForm={handleSalvarForm} />
            <MontagemContrato data={data} />
        </>
    );
}
