import Footer from '../components/Footer';
import GoldBar from '../components/GoldBar';
import GoldCoin from '../components/GoldCoin';
import Header from '../components/Header';
import GetInTouch from '../components/contact/GetInTouch';

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
                <div className="flex-grow p-6">
                    <div className="relative mb-8"> {/* Add bottom margin to separate from next section */}
                        <div className="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                        <div className="bg-[url('/liqGold2.jpeg')] bg-cover bg-center p-8 rounded-lg shadow-lg">
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                {/* Welcome Note Card */}
                                <div className="bg-white bg-opacity-60 rounded-lg shadow-md p-6 flex-1"> {/* Increased padding */}
                                    <h3 className="font-bold text-xl mb-2">Welcome to Ramkumar Jewellers!</h3>
                                    <p>
                                        <em>"Jewelry is not just an ornament it is a symbol of love tradition and timeless beauty" </em> 
                                        At <strong>Ramkumar Jewellers</strong> we are dedicated to crafting moments of elegance that last a lifetime. As a leading retailer of gold ornaments we take immense pride in offering a diverse range of designs that blend tradition with contemporary trends. Every piece of jewelry in our collection is <strong>BIS-certified and hallmark HUID</strong> ensuring not just beauty but also the highest standards of quality and authenticity. Whether you are looking for a stunning gift or a custom-designed treasure our commitment to excellence guarantees that your vision becomes a reality.
                                    </p>
                                </div>

                                {/* Commitment Card */}
                                <div className="bg-white bg-opacity-60 rounded-lg shadow-md p-6 flex-1"> {/* Increased padding */}
                                    <h3 className="font-bold text-xl mb-2">Our Commitment to You</h3>
                                    <p>
                                        <em>"Gold is the mirror of ones traditions and every piece tells a story of love and legacy" </em>
                                        Our customers are at the heart of everything we do. At <strong>Ramkumar Jewellers</strong> we strive to provide an unparalleled shopping experience combining exceptional customer service with unbeatable value. Discover our <strong>exclusive discounts and special offers</strong> thoughtfully crafted to make your purchases even more delightful. We invite you to visit us and explore a world of gold that reflects your unique style passion and traditions. With us you will find not just jewelry but a promise of trust transparency and timeless memories.
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


                    <div>
                    <GetInTouch />
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
