const AboutUs = () => {
    return (
        <div>
            <section id="about" className="mb-12 text-center p-8">
                <h2 className="text-3xl font-semibold mb-8">About Us</h2>

                {/* Image Section with Animation */}
                <div className="flex flex-col md:flex-row justify-center mb-8 space-x-0 md:space-x-6">
                    <img
                        src="/goldbar1.jpeg"
                        alt="Gold Bar 1"
                        className="max-w-full md:max-w-xs h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in mb-4 md:mb-0"
                    />
                    <img
                        src="/goldcoin1.jpeg"
                        alt="Gold Coin 1"
                        className="max-w-full md:max-w-xs h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in mb-4 md:mb-0"
                    />
                    <img
                        src="/goldbar2.jpeg"
                        alt="Gold Bar 2"
                        className="max-w-full md:max-w-xs h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in mb-4 md:mb-0"
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Who We Are</h3>
                        <p className="text-gray-700">
                            Welcome to Ramkumar Bullion! We are dedicated to offering you the most competitive rates for buying and selling gold and silver bars, ensuring that you thrive in the market. Our gold and silver bullion bars are of the highest quality, providing you with a secure long-term investment option.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Our Sources</h3>
                        <p className="text-gray-700">
                            We source our gold and silver bars from reputable suppliers, refiners, miners, government banks, multinational banks, and other trusted agencies worldwide. This enables us to offer you the best rates in the industry, with all our products being 100% hallmarked for your peace of mind.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Transparency & Trust</h3>
                        <p className="text-gray-700">
                            To ensure transparency and accessibility, we display live prices for gold and silver on our website. Our commitment to purity is reinforced by our buy-back guarantee, which allows you to sell your gold and silver back at the live market price listed on our site.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Our Commitment</h3>
                        <p className="text-gray-700">
                            At Ramkumar Bullion, we prioritize honesty and clarity in all our dealings. Our prices are updated in real-time to reflect the fluctuations in the international market. Given the volatility of gold and silver prices, we provide a platform that allows you to secure your purchases at prices that suit your needs and requirements.
                        </p>
                    </div>
                </div>
            </section>

            {/* Add this for animation effect in your CSS file or in a <style> tag */}
            <style jsx>{`
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease forwards;
                }
            `}</style>
        </div>
    );
}

export default AboutUs;
