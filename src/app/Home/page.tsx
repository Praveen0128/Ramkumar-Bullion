import GoldBar from '../components/GoldBar';
import GoldCoin from '../components/GoldCoin';
import Header from '../components/Header';

const Home = () => {
    return (
        <div>
            <Header />
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Marquee-like scrolling text */}
            <div className="overflow-hidden whitespace-nowrap bg-yellow-200 py-2">
                <div className="inline-block animate-scroll hover:animate-none">
                    <span className="text-lg text-gray-800 px-4">
                        Hollow rope, Ketty rope, Square rope, Machine chains, Kerala chains, Handmade chains are available.
                    </span>
                </div>
            </div>

            {/* Main Content */}
                <main className="flex-grow p-6">
                    <div className="relative mb-8"> {/* Add bottom margin to separate from next section */}
                        <div className="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                        <div className="bg-[url('/liqGold2.jpeg')] bg-cover bg-center p-8 rounded-lg shadow-lg">
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                {/* Welcome Note Card */}
                                <div className="bg-white bg-opacity-60 rounded-lg shadow-md p-6 flex-1"> {/* Increased padding */}
                                    <h3 className="font-bold text-xl mb-2">Welcome to Ramkumar Bullion!</h3>
                                    <p>
                                        "Discover the finest gold and silver at your fingertips."
                                        At Ramkumar Bullion, established in 1990 in Madurai, we pride ourselves on offering the best prices for precious metals compared to other dealers. With decades of experience in the bullion trade, we are committed to providing exceptional service and ensuring transparency in all our dealings. We believe in empowering our customers with reliable access to gold and silver, making your buying experience seamless and trustworthy.
                                    </p>
                                </div>

                                {/* Commitment Card */}
                                <div className="bg-white bg-opacity-60 rounded-lg shadow-md p-6 flex-1"> {/* Increased padding */}
                                    <h3 className="font-bold text-xl mb-2">Our Commitment to You</h3>
                                    <p>
                                        "Your trusted partner in bullion trading."
                                        We are dedicated to delivering not only competitive pricing but also unparalleled service to our customers. At Ramkumar Bullion, we understand the value of your investment and strive to provide an experience that exceeds your expectations. Our commitment is to ensure that every transaction is handled with care and integrity, giving you peace of mind as you invest in your future.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <div className="w-full md:w-1/2 flex-grow mb-6 md:mb-0"> {/* Add bottom margin for mobile */}
                            <GoldCoin />
                        </div>
                        <div className="w-full md:w-1/2 flex-grow mb-6 md:mb-0"> {/* Add bottom margin for mobile */}
                            <GoldBar />
                        </div>
                    </div>
                </main>
          </div>
        </div>
    );
};

export default Home;
