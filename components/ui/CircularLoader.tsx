
import React from 'react';

const CircularLoader = ({ size = 50 }: { size?: number; }) => {
    return (
        <div className="flex justify-center items-center space-x-2 h-screen">
            <div
                className={`inline-block animate-spin rounded-full border-4 border-red border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
                style={{ height: `${size}px`, width: `${size}px` }}
                role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default CircularLoader;
