import React from 'react';
import Button from './Button';

const Modal: React.FC<{ onClose: () => void; message: string }> = ({ onClose, message }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <p className="text-xl font-semibold">{message}</p>
      <Button onClick={onClose} className="bg-blue-300 mt-4">
        Close
      </Button>
    </div>
  </div>
);

export default Modal;
