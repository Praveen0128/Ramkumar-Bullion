"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Product = {
    id: number;
    image: string;
};

const necklaceImages = [
    { id: 1, image: "/necklace1.jpeg" },
    { id: 2, image: "/necklace2.jpeg" },
    { id: 3, image: "/necklace3.webp" },
    { id: 4, image: "/necklace4.jpg" },
    { id: 5, image: "/necklace5.avif" },
    { id: 6, image: "/necklace6.jpeg" },
    { id: 7, image: "/necklace7.jpg" },
    { id: 8, image: "/necklace8.jpeg" },
    { id: 9, image: "/necklace9.jpeg" },
];

const chainImages = [
    { id: 1, image: "/chain1.jpg" },
    { id: 2, image: "/chain2.jpg" },
    { id: 3, image: "/chain3.png" },
    { id: 4, image: "/chain4.webp" },
    { id: 5, image: "/chain5.webp" },
    { id: 6, image: "/chain6.jpg" },
    { id: 7, image: "/chain7.jpg" },
    { id: 8, image: "/chain8.jpg" },
    { id: 9, image: "/chain9.jpg" },
];

const ringImages = [
    { id: 1, image: "/ring1.png" },
    { id: 2, image: "/ring2.jpg" },
    { id: 3, image: "/ring3.jpg" },
    { id: 4, image: "/ring4.png" },
    { id: 5, image: "/ring5.jpg" },
    { id: 6, image: "/ring6.jpg" },
    { id: 7, image: "/ring7.jpg" },
    { id: 8, image: "/ring8.jpeg" },
    { id: 9, image: "/ring9.jpg" },
];

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Contact Us for a Quote</h2>
                <p className="text-gray-700 mb-4">
                    For more details or to get a personalized quote, please contact us at:
                </p>
                <p className="text-gray-800">📞 Phone: +91 994 0765 609</p>
                <p className="text-gray-800">📞 Phone: +91 989 4545 933</p>
                <p className="text-gray-800">📧 Email: ramkumarjewellery1@gmail.com</p>
                <div className="mt-6 flex justify-end">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Catalog = () => {
    // Set the default category to "necklace"
    const [selectedCategory, setSelectedCategory] = useState<string>("necklace");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Function to get images based on the selected category
    const getImagesForCategory = (category: string) => {
        switch (category) {
            case "necklace":
                return necklaceImages;
            case "chain":
                return chainImages;
            case "ring":
                return ringImages;
            default:
                return [];
        }
    };

    // Function to determine if the category is active
    const getButtonClass = (category: string) => {
        return selectedCategory === category
            ? "px-6 py-2 bg-yellow-600 text-white rounded-md border-2 border-yellow-700"
            : "px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none";
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="overflow-hidden whitespace-nowrap bg-yellow-200 py-2">
                <div className="inline-block animate-scroll hover:animate-none">
                    <span className="text-lg text-gray-800 px-4">
                        Various gold ornaments like chains, bangles, rings, earrings, and more are available.
                    </span>
                </div>
            </div>

            <section className="bg-gray-50 flex-grow py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-8">Our Catalog</h1>

                    {/* Category Filters */}
                    <div className="flex gap-5 text-center mb-8">
                        <button
                            onClick={() => handleCategoryChange("necklace")}
                            className={getButtonClass("necklace")}
                        >
                            Necklace
                        </button>
                        <button
                            onClick={() => handleCategoryChange("chain")}
                            className={getButtonClass("chain")}
                        >
                            Chains
                        </button>
                        <button
                            onClick={() => handleCategoryChange("ring")}
                            className={getButtonClass("ring")}
                        >
                            Rings
                        </button>
                    </div>

                    {/* Product Grid for selected category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getImagesForCategory(selectedCategory).map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition relative group transform hover:scale-105"
                            >
                                <img
                                    src={product.image}
                                    alt={`Product ${product.id}`}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                {/* "New" Badge */}
                                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold py-1 px-2">
                                    New
                                </div>

                                {/* Get Quote Button */}
                                <div className="mt-4">
                                    <button
                                        onClick={handleOpenModal}
                                        className="w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
                                    >
                                        Get Quote
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Contact Modal */}
            <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />

            <Footer />
        </div>
    );
};

export default Catalog;
