import React from "react";
import Logo from "../../public/assets/logo-black.svg";

const Footer = () => {
  return (
    <div className="bg-white-300 pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">

          <div className="col-start-1 col-end-2 flex items-center mb-6">
            <Logo className="h-8 w-auto mr-3" />
            <strong className="font-medium">LocaçãoSólida</strong>
          </div>
          <p className="mb-4">
            <strong className="font-medium">LocaçãoSólida</strong> é uma plataforma para geração e controle de contratos de locação.
          </p>
          <p className="text-gray-400">©{new Date().getFullYear()} - LocaçãoSólida</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
