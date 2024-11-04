"use client"
import { useState } from 'react';
import Link from 'next/link';

const GoldBar = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`flex justify-center items-center  transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Gold Bars Available</h2>
                <p className="text-gray-700 mb-4">
                    Discover our premium gold bars, available in weights of 10g, 20g, 50g, and 100g, crafted to meet the highest standards of quality and purity.
                    <br />
                    <span className="font-bold">Limited stock of 24K gold bars now available - secure yours today!</span>
                </p>
                <Link href="/Contact">
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300">
                        Inquire Now
                    </button>
                </Link>
                <div className="mt-4 text-gray-700">
                    <p>
                        Make a smart investment with our 24K gold bars, offering unmatched value and authenticity.
                        Each bar is a symbol of luxury, perfect for collectors and investors alike.
                    </p>
                    <br />
                    {isHovered && (
                        <ul className="list-disc list-inside mb-4">
                            <li>🏆 <strong>Premium Quality:</strong> Each bar is crafted from pure gold, ensuring maximum value.</li>
                            <li>🎉 <strong>Perfect for Celebrations:</strong> Ideal for personal milestones, or family heirlooms.</li>
                            <li>📊 <strong>Long-term Investment:</strong> Gold bars offer a stable investment choice</li>
                        </ul>
                    )}
                    <p>
                        Don’t miss out on the chance to own a piece of luxury. Embrace the opportunity to own a gold bar and invest in a tangible asset of enduring value.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoldBar;
