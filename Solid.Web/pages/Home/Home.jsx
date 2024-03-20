import CrieContratos from "../../components/Home/CrieContratos";
import Pricing from "../../components/Home/Pricing";
import Sobre from "../../components/Home/Sobre";
import SeoHead from "../../components/Home/SeoHead";

export default function Home() {
    return (
        <>
            <SeoHead title='LocaçãoSólida | Home' />
            <Sobre />
            <CrieContratos />
            <Pricing />
        </>
    );
}
