// Define the props for the Circle component, including an optional className
interface CircleProps {
  value: 'X' | 'O' | null; // The value to display in the circle
  onClick: () => void; // Function to call when the circle is clicked
  className?: string; // Optional additional class names for styling
}

const Circle: React.FC<CircleProps> = ({ value, onClick, className }) => {
  return (
    <div
      className={`w-20 h-20 bg-white border border-gray-300 rounded-full flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-100 transition duration-200 
                  ${value === 'X' ? 'text-blue-600' : 'text-green-600'} ${className}`} // Dynamic styles based on value and optional className
      onClick={onClick} // Attach the click handler
    >
      {value} 
    </div>
  );
};

export default Circle;
