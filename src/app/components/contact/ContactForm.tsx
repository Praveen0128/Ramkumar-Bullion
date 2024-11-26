"use client"
import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert("Your message has been sent succesfully!")
        // Here you can handle the form submission, e.g., sending data to an API
        console.log('Form Data Submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col w-full  border-2 border-blue-600 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-bold mb-4 text-center">Contact Us</h2>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                    rows={4}
                />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition">
                    Send Message
                </button>
            </form>

            <div className="flex flex-row gap-5 justify-evenly w-full">
                <div className="flex-1 text-left p-4 border border-gray-300 rounded-lg shadow-md">
                    <strong className="text-xl">Contact Us:</strong>
                    <p className="mt-2 text-gray-700">For any queries regarding this Privacy Policy, please contact us at:</p>

                    <div className="mt-4">
                        <p className="font-semibold">Ramkumar Jewellers</p>
                        <p>159 YMCA corner,<br /> Netaji road,<br />Madurai - 625001,<br /> Tamil Nadu</p>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    <div className="mt-4">
                        <p className="font-semibold">Mobile:</p>
                        <p className="text-gray-700">9790581978</p>
                        <p className="text-gray-700">9894545933</p>
                    </div>

                    <div className="mt-2">
                        <p className="font-semibold">Email:</p>
                        <p className="text-gray-700">ramkumarjewellery1@gmail.com</p>
                    </div>

                    <div className="mt-2">
                        <p className="font-semibold">Website:</p>
                        <p className="text-gray-700">www.ramkumarbullions.com</p>
                    </div>
                </div>

                {/* Google Maps Embed inside Contact Form tab */}
                <div className="flex-1 flex justify-center my-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.195695470086!2d78.11460387450764!3d9.917653574447336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5554943eda5%3A0x91fef8b67f08fecb!2sRamkumar%20Jewellers!5e0!3m2!1sen!2sin!4v1732623063069!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
