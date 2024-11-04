"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use this to get the current pathname
import { FaHome, FaPhoneAlt, FaInfoCircle, FaChartLine } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current pathname

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define active link styles
  const activeLinkClass = "bg-gray-500 text-white"; 
  const defaultLinkClass = "text-blue-600 hover:bg-blue-500 hover:text-white";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ramkumar Bullion</h1>
        {/* Burger Icon */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <div className={`w-6 h-1 bg-white mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-1 bg-white mb-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-1 bg-white mb-1 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </header>

      {/* Navbar */}
      <nav className={`bg-gray-200 p-4 flex justify-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
        <Link href="/Home" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Home' ? activeLinkClass : defaultLinkClass}`}>
          <FaHome className="mr-2" /> Home
        </Link>
        <Link href="/LiveRate" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/LiveRate' ? activeLinkClass : defaultLinkClass}`}>
          <FaChartLine className="mr-2" /> Live Rate
        </Link>
        <Link href="/About" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/About' ? activeLinkClass : defaultLinkClass}`}>
          <FaInfoCircle className="mr-2" /> About Us
        </Link>
        <Link href="/Contact" className={`flex items-center rounded-lg px-4 py-2 ${pathname === '/Contact' ? activeLinkClass : defaultLinkClass}`}>
          <FaPhoneAlt className="mr-2" /> Contact
        </Link>
      </nav>
    </div>
  );
};

export default Header;
