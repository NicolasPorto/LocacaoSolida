import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Stars from "../../public/assets/Icon/stars.svg";
import ArrowBack from "../../public/assets/Icon/eva_arrow-back-fill.svg";
import ArrowNext from "../../public/assets/Icon/eva_arrow-next-fill.svg";

const Testemunhas = ({
  listTestimoni = [
    {
      name: "João Silva",
      image: "/assets/people-3.png",
      city: "Joinville",
      country: " Brasil",
      rating: "4.5",
      testimoni:
        "Fiquei muito satisfeito com a facilidade de uso da plataforma. Conseguimos criar nossos contratos de locação em poucos minutos!",
    },
    {
      name: "Maria Oliveira",
      image: "/assets/people-3.png",
      city: "Blumenau",
      country: " Brasil",
      rating: "4.7",
      testimoni:
        "Ótimo serviço para quem precisa acompanhar as parcelas de aluguel. Nunca foi tão fácil gerenciar meus pagamentos.",
    },
    {
      name: "Pedro Santos",
      image: "/assets/people-3.png",
      city: "Blumenau",
      country: " Brasil",
      rating: "5",
      testimoni:
        "Estou impressionado com a eficiência dessa plataforma. Agora consigo visualizar todas as parcelas de recibos em um único lugar.",
    },
    {
      name: "Carlos Silva",
      image: "/assets/people-3.png",
      city: "Joinville",
      country: " Brasil",
      rating: "4.7",
      testimoni:
        "Uma ferramenta essencial para quem lida com aluguéis. A plataforma é intuitiva e me ajudou a organizar meus contratos de locação de forma eficiente. Recomendo fortemente a todos os proprietários e inquilinos.",
    },
  ],
}) => {
  const settings = {
    dots: true,
    customPaging: function (i) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute mt-20",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-gray-500 hover:border-person-500 transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <Image
                    src={listTestimonis.image}
                    height={50}
                    width={50}
                    alt="Icon People"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-black-600 capitalize">
                      {listTestimonis.name}
                    </p>
                    <p className="text-sm text-black-500 capitalize">
                      {listTestimonis.city},{listTestimonis.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{listTestimonis.rating}</p>
                  <span className="flex ml-4">
                    <Stars className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">“{listTestimonis.testimoni}”</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-person-500 border hover:bg-person-500 hover:text-white-500 transition-all text-person-500 cursor-pointer"
            onClick={sliderRef?.slickPrev}
          >
            <ArrowBack className="h-6 w-6 " />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-person-500 border hover:bg-person-500 hover:text-white-500 transition-all text-person-500 cursor-pointer"
            onClick={sliderRef?.slickNext}
          >
            <ArrowNext className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testemunhas;
