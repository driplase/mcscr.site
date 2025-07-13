import React from 'react';
import { ASCII_LOGO, NAV_ITEMS } from '../constants';
import { NavLink } from 'react-router';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <pre className="text-sm max-md:text-[1.8vmin] text-green-500 mb-8">{ASCII_LOGO}</pre>
        <nav className="flex flex-col items-start gap-2 text-xl">
            {NAV_ITEMS.map((item, idx) => (
                <NavLink
                    key={idx}
                    to={item}
                    className="hover:bg-green-400 hover:text-black focus:outline-none focus:bg-green-400 focus:text-black px-2 transition-colors duration-150"
                >
                    {item}
                </NavLink>
            ))}
        </nav>
    </div>
  );
};

export default Header;