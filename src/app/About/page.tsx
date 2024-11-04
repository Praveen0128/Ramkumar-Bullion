"use client"
import React, { useState } from 'react';
import AboutUs from "../components/about/AboutUs";
import PrivacyPolicy from "../components/about/Privacy";
import TermsAndConditions from "../components/about/Terms";
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
    const [activeComponent, setActiveComponent] = useState('aboutUs');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'aboutUs':
                return <AboutUs />;
            case 'terms':
                return <TermsAndConditions />;
            case 'privacy':
                return <PrivacyPolicy />;
            default:
                return <AboutUs />;
        }
    };

    return (
        <div>
            <Header />
            <div className="overflow-hidden whitespace-nowrap bg-yellow-200 py-2">
                <div className="inline-block animate-scroll hover:animate-none">
                    <span className="text-lg text-gray-800 px-4">
                        10 gram Gold bar, 20 gram Gold bar, 100 gram Gold bar, 24k Gold bars are available.
                    </span>
                </div>
            </div>
        <div className="mx-auto p-6 w-full">
            <nav className="flex justify-start mb-6 space-x-4">
                <button
                    className={`p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-100 transition-colors ${activeComponent === 'aboutUs' ? 'font-bold border-blue-600 bg-blue-100' : ''}`}
                    onClick={() => setActiveComponent('aboutUs')}
                >
                    About Us
                </button>
                <button
                    className={`p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-100 transition-colors ${activeComponent === 'terms' ? 'font-bold border-blue-600 bg-blue-100' : ''}`}
                    onClick={() => setActiveComponent('terms')}
                >
                    Terms and Conditions
                </button>
                <button
                    className={`p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-100 transition-colors ${activeComponent === 'privacy' ? 'font-bold border-blue-600 bg-blue-100' : ''}`}
                    onClick={() => setActiveComponent('privacy')}
                >
                    Privacy Policy
                </button>
            </nav>

            <div className="bg-white shadow-md rounded-lg  w-full">
                {renderComponent()}
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
