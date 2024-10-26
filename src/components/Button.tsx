import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`text-white px-6 py-3 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
