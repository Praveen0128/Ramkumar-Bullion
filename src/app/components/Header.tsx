"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPhoneAlt, FaInfoCircle, FaChartLine, FaThLarge } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bgColor, setBgColor] = useState("bg-rose-800");
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Define active and default link styles
    const activeLinkClass = "bg-yellow-500 text-black";
    const defaultLinkClass = "text-white hover:bg-yellow-400 hover:text-black";

    // Function to handle link click and close the menu
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Change background color on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setBgColor("bg-rose-600");
            } else {
                setBgColor("bg-rose-800");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`${bgColor} text-white p-4 px-20 sticky top-0 w-full flex justify-between items-center transition-colors duration-300 z-50`}>
            {/* Logo */}
            <div className="flex items-center justify-end space-x-4">
                <img
                    src="/Amman.jpeg"
                    alt="amman Bank"
                    className="h-12 w-12 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                />
                <h1 className="text-2xl font-bold text-right md:text-left md:flex-grow">
                    <span className="block md:inline">Ramkumar Jewellers</span>
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-4">
                <Link href="/Home" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Home' ? activeLinkClass : defaultLinkClass}`}>
                    <FaHome className="mr-2" /> Home
                </Link>
                <Link href="/LiveRate" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/LiveRate' ? activeLinkClass : defaultLinkClass}`}>
                    <FaChartLine className="mr-2" /> Live Rate
                </Link>
                <Link href="/Catalog" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Catalog' ? activeLinkClass : defaultLinkClass}`}>
                    <FaThLarge className="mr-2" /> Catalog
                </Link>
                <Link href="/About" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/About' ? activeLinkClass : defaultLinkClass}`}>
                    <FaInfoCircle className="mr-2" /> About Us
                </Link>
                <Link href="/Contact" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Contact' ? activeLinkClass : defaultLinkClass}`}>
                    <FaPhoneAlt className="mr-2" /> Contact
                </Link>
            </nav>

            {/* Burger Icon for Mobile */}
            <button onClick={toggleMenu} className="md:hidden focus:outline-none">
                <div className={`w-6 h-1 bg-white mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-1 bg-white mb-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-1 bg-white mb-1 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="bg-rose-600 p-4 absolute top-16 left-0 w-full flex flex-col space-y-4 md:hidden z-50">
                    <Link href="/Home" onClick={handleLinkClick} className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Home' ? activeLinkClass : defaultLinkClass}`}>
                        <FaHome className="mr-2" /> Home
                    </Link>
                    <Link href="/LiveRate" onClick={handleLinkClick} className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/LiveRate' ? activeLinkClass : defaultLinkClass}`}>
                        <FaChartLine className="mr-2" /> Live Rate
                    </Link>
                    <Link href="/Catalog" onClick={handleLinkClick} className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Catalog' ? activeLinkClass : defaultLinkClass}`}>
                        <FaThLarge className="mr-2" /> Catalog
                    </Link>
                    <Link href="/About" onClick={handleLinkClick} className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/About' ? activeLinkClass : defaultLinkClass}`}>
                        <FaInfoCircle className="mr-2" /> About Us
                    </Link>
                    <Link href="/Contact" onClick={handleLinkClick} className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Contact' ? activeLinkClass : defaultLinkClass}`}>
                        <FaPhoneAlt className="mr-2" /> Contact
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
