import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const TitlePanel = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const navigate = useNavigate();

    function handleSignOut() {
        localStorage.setItem('isAuthenticated', 'false');
        const uid = localStorage.getItem('uid');
        axios.post("http://localhost:8080/api/logout", {
            uid: Number(uid)
        }).then((response) => {
            if (response.status == 200) {
                localStorage.setItem('uid', '')
            }
        })
        navigate('/')
    }

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
                            <Link to="/user" className="hover:text-gray-300 flex items-center">
                                <FaUserCircle className="mr-1" /> Account
                            </Link>
                        </li>
                        {
                            isAuthenticated ? <li>
                                <button onClick={handleSignOut} className="hover:text-gray-300 flex items-center">
                                    SignOut
                                </button>
                            </li> : <li>
                                <Link to="/" className="hover:text-gray-300 flex items-center">
                                    SignIn
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TitlePanel;
