import { FaUserCircle } from "react-icons/fa";

interface TitlePanelProps {
    title: string;
}


const TitlePanel: React.FC<TitlePanelProps> = ({ title }) => {
    return (
        <div className="bg-black p-3 text-white flex items-center justify-between">
            <h1 className="text-lg">{title}</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li><a href="/" className="hover:text-gray-300">About Us</a></li>
                    <li><a href="/" className="hover:text-gray-300 flex items-center">
                        <FaUserCircle className="mr-1" /> Account
                    </a></li>
                </ul>
            </nav>
        </div>
    );
};

export default TitlePanel;
