import React from "react";
import Link from 'next/link';

const ButtonPrimary = ({ children, href, addClass }) => {
  return (
    <Link href={href !== undefined ? href : ''}>
      <a className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-person-500 hover:shadow-person-md transition-all outline-none " +
        addClass
      }>
        {children}
      </a>
    </Link>
  );
};

export default ButtonPrimary;
