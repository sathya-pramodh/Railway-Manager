import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TitlePanel = () => {
    return (
        <div>
            <div className="bg-black p-3 text-white flex items-center justify-between">
                <h1 className="text-lg">RailBooking</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link to="/home" className="hover:text-gray-300">Home</Link></li>
                        <li>
                            <Link to="/AboutUs" className="hover:text-gray-300">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="hover:text-gray-300 flex items-center">
                                <FaUserCircle className="mr-1" /> Account
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TitlePanel;
