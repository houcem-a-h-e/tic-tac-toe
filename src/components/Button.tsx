
// Define a Button component that accepts all standard button attributes
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    // Apply base styles for the button, including padding, rounded corners, and shadows
    className={`text-white px-6 py-3 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
    {...props} // Spread additional props (like onClick) onto the button
  >
    {children} 
  </button>
);

export default Button;
