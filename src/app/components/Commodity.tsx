"use client";
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const CommodityTables = () => {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRates() {
            try {
                const response = await fetch('/api/goldRate');
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                console.log("Fetched Rates:", data); // Log the data to inspect its structure
                setRates(data);
            } catch (error) {
                console.error("Error fetching rates:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRates();
    }, []);

    const formatINR = (amount: any) => `₹${amount.toLocaleString('en-IN')}`;

    const headerClass = "py-3 px-6 font-semibold text-left border border-gray-600";
    const cellClass = "py-3 px-6 font-medium text-gray-800 border-r";
    const dataClass = "py-3 px-6 text-gray-700 font-semibold";

    if (loading) return <div><Loader /></div>;
    if (!rates) return <div>No data available</div>;

    const {
        pureGoldBuy = 0,
        pureGoldSell = 0,
        gold22KBuy = 0,
        gold22KSell = 0,
        silverBuy = 0,
        silverSell = 0,
    } = rates;

    return (
        <div className="p-6 flex flex-col gap-8">
            {/* Table 1: Commodity Buy and Sell */}
            <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-300">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className={headerClass}>Commodity</th>
                            <th className={headerClass}>Buy</th>
                            <th className={headerClass}>Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold (Pure)</td>
                            <td className={dataClass}>{formatINR(pureGoldBuy)}</td>
                            <td className={dataClass}>{formatINR(pureGoldSell)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold (22K)</td>
                            <td className={dataClass}>{formatINR(gold22KBuy)}</td>
                            <td className={dataClass}>{formatINR(gold22KSell)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Silver (1KG)</td>
                            <td className={dataClass}>{formatINR(silverBuy)}</td>
                            <td className={dataClass}>{formatINR(silverSell)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Table 2: Gold and Silver Rate Per Gram in Madurai */}
            <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-300">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className={headerClass}>Commodity</th>
                            <th className={headerClass}>Price per Gram</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold 1g (24K)</td>
                            <td className={dataClass}>{formatINR((pureGoldBuy / 10).toFixed(2))}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Silver 1g</td>
                            <td className={dataClass}>{formatINR((silverBuy / 1000).toFixed(2))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Responsive Cards for Bid, Ask, High, and Low */}
            <div className="block md:hidden">
                <h2 className="text-xl font-semibold mb-4">Commodity Rates</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg">
                        <h3 className="bg-gray-700 text-white font-semibold text-lg py-2 px-4 rounded-t-lg">Gold</h3>
                        <div className="border-t border-gray-300 p-4 flex flex-col space-y-2">
                            <div className="flex justify-between px-10">
                                <span><strong>Bid:</strong></span>
                                <span>{formatINR(pureGoldBuy - 10)}</span>
                            </div>
                            <div className="flex justify-between px-10">
                                <span><strong>Ask:</strong></span>
                                <span>{formatINR(pureGoldSell + 10)}</span>
                            </div>
                            <div className="flex justify-between px-10">
                                <span><strong>High:</strong></span>
                                <span>{formatINR(pureGoldBuy + 20)}</span>
                            </div>
                            <div className="flex justify-between px-10">
                                <span><strong>Low:</strong></span>
                                <span>{formatINR(pureGoldSell - 20)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 border border-gray-300 rounded-lg">
                        <h3 className="bg-gray-700 text-white font-semibold text-lg py-2 px-4 rounded-t-lg">Silver</h3>
                        <div className="border-t border-gray-300 p-4 flex flex-col space-y-2">
                            <div className="flex justify-between px-10">
                                <span><strong>Bid:</strong></span>
                                <span>{formatINR(silverBuy - 5)}</span>
                            </div>
                            <div className="flex justify-between px-10">
                                <span><strong>Ask:</strong></span>
                                <span>{formatINR(silverSell + 5)}</span>
                            </div>
                            <div className="flex justify-between px-10">
                                <span><strong>High:</strong></span>
                                <span>{formatINR(silverBuy + 10)}</span>
                            </div>
                            <div className="flex justify-between px-10">
                                <span><strong>Low:</strong></span>
                                <span>{formatINR(silverSell - 10)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Table for larger screens */}
            <div className="hidden md:block relative overflow-hidden rounded-lg shadow-lg border border-gray-300">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className={headerClass}>Commodity</th>
                            <th className={headerClass}>Bid</th>
                            <th className={headerClass}>Ask</th>
                            <th className={headerClass}>High</th>
                            <th className={headerClass}>Low</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold</td>
                            <td className={dataClass}>{formatINR(pureGoldBuy - 10)}</td>
                            <td className={dataClass}>{formatINR(pureGoldSell + 10)}</td>
                            <td className={dataClass}>{formatINR(pureGoldBuy + 20)}</td>
                            <td className={dataClass}>{formatINR(pureGoldSell - 20)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Silver</td>
                            <td className={dataClass}>{formatINR(silverBuy - 5)}</td>
                            <td className={dataClass}>{formatINR(silverSell + 5)}</td>
                            <td className={dataClass}>{formatINR(silverBuy + 10)}</td>
                            <td className={dataClass}>{formatINR(silverSell - 10)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommodityTables;
