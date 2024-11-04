"use client"
import React, { useState } from 'react';
import AboutUs from "../components/about/AboutUs";
import PrivacyPolicy from "../components/about/Privacy";
import TermsAndConditions from "../components/about/Terms";

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
        <div className="mx-auto p-6 w-full">
            <nav className="flex justify-around mb-6">
                <button 
                    className={`p-2 ${activeComponent === 'aboutUs' ? 'font-bold' : ''}`} 
                    onClick={() => setActiveComponent('aboutUs')}
                >
                    About Us
                </button>
                <button 
                    className={`p-2 ${activeComponent === 'terms' ? 'font-bold' : ''}`} 
                    onClick={() => setActiveComponent('terms')}
                >
                    Terms and Conditions
                </button>
                <button 
                    className={`p-2 ${activeComponent === 'privacy' ? 'font-bold' : ''}`} 
                    onClick={() => setActiveComponent('privacy')}
                >
                    Privacy Policy
                </button>
            </nav>
            <div className="bg-white shadow-md rounded-lg  w-full">
                {renderComponent()}
            </div>
        </div>
    );
};

export default About;
