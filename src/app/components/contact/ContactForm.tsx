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
        <form onSubmit={handleSubmit} className="flex flex-col p-6 border-2 border-blue-600 rounded-lg bg-white shadow-md">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
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
                rows={4} // Changed from '4' (string) to 4 (number)
            />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition">
                Send Message             
            </button>
        </form>
    );
};

export default ContactForm;
