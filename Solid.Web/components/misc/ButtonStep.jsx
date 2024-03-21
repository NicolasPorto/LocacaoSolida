import React from "react";

const ButtonStep = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className={
            "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-person-500 hover:shadow-person-md transition-all outline-none "
        }>
            {children}
        </button>
    );
};

export default ButtonStep;
