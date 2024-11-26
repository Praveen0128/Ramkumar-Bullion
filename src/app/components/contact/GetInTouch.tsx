"use client";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const GetInTouch = () => {
    const [showNotification, setShowNotification] = useState(false);

    const handleClick = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    };

    return (
        <section className="bg-gray-100 py-12 relative">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 mt-2">Have something in mind? Let us call you back</h2>

                {/* Input Fields */}
                <div className="flex flex-wrap justify-center gap-10">
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <input
                            type="text"
                            placeholder="Number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full">
                        <button
                            onClick={handleClick}
                            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Get In Touch
                        </button>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mt-10 text-lg">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
                        {/* Phone Numbers */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center">
                                <FaPhoneAlt className="text-xl mr-2 text-blue-500" />
                                <span className="text-gray-700">+91-979-058-1978</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <FaPhoneAlt className="text-xl mr-2 text-blue-500" />
                                <span className="text-gray-700">+91-989-454-5933</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <FaPhoneAlt className="text-xl mr-2 text-blue-500" />
                                <span className="text-gray-700">+91-994-076-5609</span>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center justify-center">
                            <FaEnvelope className="text-xl mr-2 text-blue-500" />
                            <span className="text-gray-700">ramkumarjewelery1@gmail.com</span>
                        </div>

                        {/* Address */}
                        <div className="flex items-center justify-center">
                            <FaMapMarkerAlt className="text-xl mr-2 text-blue-500" />
                            <span className="text-gray-700">
                                159 YMCA corner, Netaji road, Madurai, Tamil Nadu-625009, India
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification */}
            {showNotification && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300">
                    Call 9790581978 to contact our customer support or email us
                </div>
            )}
        </section>
    );
};

export default GetInTouch;
