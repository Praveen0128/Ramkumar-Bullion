// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
    );
};

export default Loader;
