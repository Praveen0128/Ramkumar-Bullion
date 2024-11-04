"use client"
import { useState } from 'react';
import Bank from '../components/contact/Bank';
import Booking from '../components/contact/Booking';
import ContactForm from '../components/contact/ContactForm';
import SocialMediaLinks from '../components/contact/SocialMedia';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
    const [activeTab, setActiveTab] = useState('booking');

    const renderComponent = () => {
        switch (activeTab) {
            case 'booking':
                return (
                    <div className="flex flex-col md:flex-row items-stretch w-full">
                        {/* Image Container for Booking Tab */}
                        <div className="flex flex-col md:flex-row flex-grow items-center justify-evenly gap-4">
                            {/* First Image */}
                            <img
                                src="/goldbar1.jpeg"
                                alt="Gold Bar"
                                className="max-w-full h-[350px] rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in"
                            />
                            {/* Booking Component */}
                            <div className="mx-4 flex items-center">
                                <Booking />
                            </div>
                            {/* Second Image */}
                            <img
                                src="/goldbar2.jpeg"
                                alt="Gold Bar 2"
                                className="max-w-full h-[350px] rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in"
                            />
                        </div>
                    </div>

                );
            case 'bank':
                return <Bank />;
            case 'contactForm':
                return (
                    <div>
                        <ContactForm />
                        {/* Google Maps Embed inside Contact Form tab */}
                        <div className="flex justify-center my-8">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.792568687352!2d78.11785261502697!3d9.925085690491777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b066dd77c6875a3%3A0x5c67d24114b8f70d!2sRamkumar%20Jewellers!5e0!3m2!1sen!2sin!4v1633548562840!5m2!1sen!2sin" 
                                width="100%" 
                                height="450" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                );               
            default:
                return <ContactForm />;
        }
    };

    return (
        <div>
            <Header />
            <div className="overflow-hidden whitespace-nowrap bg-yellow-200 py-2">
                <div className="inline-block animate-scroll hover:animate-none">
                    <span className="text-lg text-gray-800 px-4">
                        1 gram Gold coins, 8 gram Gold coins, 10 gram Gold coins, 24k Gold coins are available.
                    </span>
                </div>
            </div>
        <div className="mx-auto p-6 w-full max-w-full">
            <nav className="flex justify-start mb-6 space-x-4">
                <button
                    className={`p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-100 transition-colors ${activeTab === 'booking' ? 'font-bold border-blue-600 bg-blue-100' : ''}`}
                    onClick={() => setActiveTab('booking')}
                >
                    Booking
                </button>
                <button
                    className={`p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-100 transition-colors ${activeTab === 'contactForm' ? 'font-bold border-blue-600 bg-blue-100' : ''}`}
                    onClick={() => setActiveTab('contactForm')}
                >
                    Contact Form
                </button>
                <button
                    className={`p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-100 transition-colors ${activeTab === 'bank' ? 'font-bold border-blue-600 bg-blue-100' : ''}`}
                    onClick={() => setActiveTab('bank')}
                >
                    Banking Details
                </button>
            </nav>


            {/* Render the selected component */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full">
                {activeTab === 'booking' && renderComponent()}
                {activeTab === 'bank' && <Bank />}
                {activeTab === 'contactForm' && (
                    <div>
                        <ContactForm />
                        {/* Google Maps Embed inside Contact Form tab */}
                        <div className="flex justify-center my-8">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.792568687352!2d78.11785261502697!3d9.925085690491777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b066dd77c6875a3%3A0x5c67d24114b8f70d!2sRamkumar%20Jewellers!5e0!3m2!1sen!2sin!4v1633548562840!5m2!1sen!2sin" 
                                width="100%" 
                                height="450" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                )}                
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center mb-6">
                <SocialMediaLinks />
            </div>

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
            <Footer />
        </div>
    );
}

export default Contact;
