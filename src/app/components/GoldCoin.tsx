"use client"
import { useState } from 'react';
import Link from 'next/link';

const GoldCoin = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`flex justify-center items-center  transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Gold Coins Available</h2>
                <p className="text-gray-700 mb-4">
                    We have gold coins from 0.5 to 8 grams <b>916 Hallmark</b>. Offering customized coins in 10, 20, and 100 grams!
                    <br />
                    <span className="font-bold">24K gold coin also available - limited stock!</span>
                </p>
                <Link href="/Contact">
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300">
                        Order Now
                    </button>
                </Link>
                <div className="mt-4 text-gray-700">
                    <p>
                        Elevate your investment with our exquisite 24K gold coins, meticulously crafted to ensure both beauty and value.
                        Each coin is a symbol of luxury, perfect for collectors and investors alike.
                    </p>
                    <br />
                    {isHovered && (
                        <ul className="list-disc list-inside mb-4">
                            <li>💎 <strong>Pure Gold Assurance:</strong> Each coin is made of 24K gold, guaranteeing the highest quality.</li>
                            <li>🎁 <strong>Perfect Gift:</strong> A memorable gift for special occasions, anniversaries, or milestones.</li>
                            <li>🛍️ <strong>Limited Edition:</strong> Our limited stock means that your investment is unique and exclusive.</li>
                        </ul>
                    )}
                    <p>
                        Don’t miss out on the chance to own a piece of luxury. Contact us today to place your order and be one of the few to own these magnificent 24K gold coins!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoldCoin;
