"use client"
import React, { useState } from 'react';
import AboutUs from "../components/about/AboutUs";
import PrivacyPolicy from "../components/about/Privacy";
import TermsAndConditions from "../components/about/Terms";
import Header from '../components/Header';

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
        </div>
    );
};

export default About;
