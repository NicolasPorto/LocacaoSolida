import React from "react";

const ButtonStepBack = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className={
            "py-3 lg:py-4 px-12 lg:px-16 text-black-500 font-semibold rounded-lg bg-gray-500 hover:shadow-person-md transition-all outline-none mr-4"
        }>
            {children}
        </button>
    );
};

export default ButtonStepBack;
