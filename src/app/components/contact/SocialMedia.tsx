import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const SocialMediaLinks = () => (
    <div className="flex justify-center space-x-4 mt-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaTwitter />
        </a>
    </div>
);

export default SocialMediaLinks