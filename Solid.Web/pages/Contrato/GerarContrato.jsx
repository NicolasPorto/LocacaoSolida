import HeadPagina from "../../components/Home/HeadPagina";
import FormContrato from "../../components/Contrato/FormContrato";
import Editor from "../../components/Contrato/Editor";

export default function GerarContrato() {
    return (
        <>
            <HeadPagina title='LocaçãoSólida | Gerar' />
            <FormContrato/>
            <Editor/>
        </>
    );
}
