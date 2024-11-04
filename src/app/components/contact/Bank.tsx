const Bank = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full mt-6 p-4 md:p-6 space-y-4 md:space-y-0">
            {/* Table Container */}
            <div className="overflow-x-auto w-full md:flex-grow md:mr-4">
                <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-4 px-6 text-left font-bold text-gray-800 text-lg">Bank Details</th>
                            <th className="py-4 px-6 text-left font-bold text-gray-800 text-lg">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: 'Bank Name', value: 'Axis Bank' },
                            { label: 'Account Holder Name', value: 'Ramkumar Jewellers' },
                            { label: 'Account Number', value: '109010200015057' },
                            { label: 'IFSC Code', value: 'UTIB0000109' },
                            { label: 'Branch', value: 'Madurai Main' }
                        ].map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6 font-bold text-gray-800">{item.label}</td>
                                <td className="py-4 px-6 text-gray-600">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Image Container */}
            <div className="flex-grow md:flex-shrink-0 md:w-1/3 mt-4 md:mt-0">
                <img
                    src="/axis.png"
                    alt="Axis Bank"
                    className="h-auto w-full rounded-lg shadow-lg transition-transform transform hover:scale-105"
                />
            </div>
        </div>
    );
};

export default Bank;
