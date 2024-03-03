import { Link } from "react-router-dom";
import Erro404 from '../../images/illustrations/404.svg'

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
            <div className="block md:max-w-lg">
                <img src={Erro404} alt="astronaut image" />
            </div>
            <div className="text-center xl:max-w-4xl">
                <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">Página não encontrada</h1>
                <p className="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">Oops! Parece que você entrou em um link errado. Se você acha que encontrou um problema, por favor nos avise.</p>
                <Link to="/" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Voltar para home
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound;
