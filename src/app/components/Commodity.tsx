const CommodityTables = () => {
    return (
        <div className="p-6 flex flex-col gap-8">
            {/* Table Wrapper with Background and Borders */}
            <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-300">
                <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-4">
                    {/* Table 1: Commodity Buy and Sell */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-gray-700 text-white">
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Commodity</th>
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Buy</th>
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Sell</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                                    <td className="py-3 px-6 font-medium text-gray-800 border-r">Gold (Pure)</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹5000</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹4950</td>
                                </tr>
                                <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                                    <td className="py-3 px-6 font-medium text-gray-800 border-r">Gold (22K)</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹4700</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹4650</td>
                                </tr>
                                <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                                    <td className="py-3 px-6 font-medium text-gray-800 border-r">Silver (1 Kilo)</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹750</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹740</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Table 2: Gold and Silver Rate Per Gram in Madurai */}
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full bg-white rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-gray-700 text-white">
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Commodity</th>
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Price per Gram</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                                    <td className="py-3 px-6 font-medium text-gray-800 border-r">Gold (Madurai, 1g)</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹5100</td>
                                </tr>
                                <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                                    <td className="py-3 px-6 font-medium text-gray-800 border-r">Silver (Madurai, 1g)</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹52</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Table 3: Commodity Bid, Ask, High, and Low */}
                    {/* Card-Style Table for Mobile */}
                    <div className="flex flex-col mt-6 space-y-4 md:hidden">
                        {[
                            {
                                commodity: 'Gold',
                                bid: '₹5020',
                                ask: '₹4980',
                                high: '₹5050',
                                low: '₹4950'
                            },
                            {
                                commodity: 'Silver',
                                bid: '₹755',
                                ask: '₹745',
                                high: '₹760',
                                low: '₹740'
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
                                <h3 className="bg-gray-700 text-white rounded-t-lg py-2 px-4 font-bold text-lg">{item.commodity}</h3>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-600 p-2">Bid:</span>
                                        <span className="text-gray-800 p-2">{item.bid}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-600 p-2">Ask:</span>
                                        <span className="text-gray-800 p-2">{item.ask}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-600 p-2">High:</span>
                                        <span className="text-gray-800 p-2">{item.high}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-600 p-2">Low:</span>
                                        <span className="text-gray-800 p-2">{item.low}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View - Traditional Table Layout */}
                    <div className="hidden md:block overflow-x-auto mt-6">
                        <table className="min-w-full bg-white rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-gray-700 text-white">
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Commodity</th>
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Bid</th>
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Ask</th>
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">High</th>
                                    <th className="py-3 px-6 font-semibold text-left border border-gray-600">Low</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                                    <td className="py-3 px-6 font-medium text-gray-800 border-r">Gold</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹5020</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹4980</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹5050</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹4950</td>
                                </tr>
                                <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                                    <td className="py-3 px-6 font-medium text-gray-800 border-r">Silver</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹755</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹745</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹760</td>
                                    <td className="py-3 px-6 text-gray-700 font-semibold">₹740</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommodityTables;
