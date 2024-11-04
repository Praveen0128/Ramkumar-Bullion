const Bank = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="overflow-x-auto w-full flex-grow-0 flex-shrink-0" style={{ flex: "3 0 0" }}>
                <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-6 text-left font-bold text-gray-800 text-lg">Bank Details</th>
                            <th className="py-3 px-6 text-left font-bold text-gray-800 text-lg">Information</th>
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
                                <td className="py-3 px-6 font-bold text-gray-800">{item.label}</td>
                                <td className="py-3 px-6 text-gray-600">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="ml-6 flex-grow-0 flex-shrink-0" style={{ flex: "2 0 0" }}>
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
