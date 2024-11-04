import { FaPhoneAlt } from 'react-icons/fa';

const Booking = () => {
    return (
        <section id="contact" className="flex-1 mb-12 text-center border-2 border-blue-600 rounded-lg p-6 bg-gradient-to-r from-blue-400 to-blue-600 shadow-md flex flex-col justify-between">
            <h2 className="text-lg font-bold text-white mb-4">For Booking, Call Us at:</h2>
            <div className="flex flex-col items-center">
                {["+91 9790581978", "+91 9894545933", "+91 9940765609"].map((number, index) => (
                    <div key={index} className="flex items-center bg-white text-blue-600 font-bold py-3 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4 animate-bounce">
                        <span className="mr-2">{number}</span>
                        <FaPhoneAlt className="h-6 w-6" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Booking;
