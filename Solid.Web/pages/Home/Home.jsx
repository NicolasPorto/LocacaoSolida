import CrieContratos from "../../components/Home/CrieContratos";
import Pricing from "../../components/Home/Pricing";
import Sobre from "../../components/Home/Sobre";
import HeadPagina from "../../components/Home/HeadPagina";

export default function Home() {
    return (
        <>
            <HeadPagina title='LocaçãoSólida | Home' />
            <Sobre />
            <CrieContratos />
            <Pricing />
        </>
    );
}
