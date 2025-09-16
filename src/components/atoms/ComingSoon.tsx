import React from 'react';

interface ComingSoonProps {
  message?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ 
  message = "Coming soon..." 
}) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-300 mb-6">{message}</p>
      </div>
    </div>
  );
};

export default ComingSoon;
