"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
};

const products: Product[] = [
    {
        id: 1,
        name: "Gold Necklace - Design 1",
        price: "₹50,000",
        image: "/necklace1.jpeg",
    },
    {
        id: 2,
        name: "Gold Necklace - Design 2",
        price: "₹65,000",
        image: "/necklace2.jpeg",
    },
    {
        id: 3,
        name: "Gold Bangle",
        price: "₹30,000",
        image: "/bangles1.jpeg",
    },
];

const Catalog = () => {
    const [viewDetails, setViewDetails] = useState<Product | null>(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <section className="bg-gray-50 flex-grow py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-8">Our Catalog</h1>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-600">{product.price}</p>
                                <button
                                    onClick={() => setViewDetails(product)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Details Modal */}
                    {viewDetails && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg w-3/4 max-w-lg">
                                <h2 className="text-2xl font-bold mb-4">{viewDetails.name}</h2>
                                <img
                                    src={viewDetails.image}
                                    alt={viewDetails.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <p className="text-gray-600">Price: {viewDetails.price}</p>
                                <button
                                    onClick={() => setViewDetails(null)}
                                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Catalog;
