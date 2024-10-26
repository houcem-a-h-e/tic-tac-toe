interface SquareProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <div
            className="w-20 h-20 bg-red-500 border border-gray-300 flex items justify-center text-4xl cursor-pointer hover:bg-gray-100 transition duration-200"
            onClick={onClick}
        >
            {value}
        </div>
    );
}

export default Square;