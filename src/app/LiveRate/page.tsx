import CommodityTables from '../components/Commodity';
import Header from '../components/Header';
import Booking from '../components/contact/Booking';

const LiveRate = () => {
    return (
        <div>
            <Header />
        <div className="flex flex-col p-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* Left Column with the Commodity Tables - 4/5 width */}
                <div className="flex-grow md:w-4/5">
                    <CommodityTables />
                </div>

                {/* Right Column with Image and Booking - 1/5 width */}
                <div className="flex flex-col w-full md:w-1/5">
                    <div className="flex-1 flex justify-center items-center mb-4 md:mb-0">
                        <img 
                            src="/GoldChart1.jpeg" 
                            alt="Gold" 
                            className="max-w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="flex-1 flex items-center">
                        <Booking />
                    </div>
                </div>
            </div>

            <section className="my-12">
                <div className="text-gray-800">
                    <h3 className="text-xl font-bold mb-4">Disclaimer</h3>
                    <hr className="border-gray-900 border-2" />
                    <p className="text-gray-700 mt-4">
                        Ramkumar Bullion provides gold and silver prices sourced from various reputable channels. However, we do not guarantee the accuracy of this information. The data regarding our gold and silver prices is provided without any warranty or claim of reliability. By accessing our site, visitors accept that any errors or omissions shall not be grounds for any claims, demands, or actions.
                    </p>
                </div>
            </section>
            </div>
        </div>
    );
};

export default LiveRate;
