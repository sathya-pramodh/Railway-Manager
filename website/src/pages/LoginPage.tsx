import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email: username,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem('isAuthenticated', 'true'); // Store flag in local storage
                navigate('/home');
            } else {
                alert('Invalid credentials');
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Invalid credentials');
            navigate('/');
        }
    };

    return (
        <>
            <div className="bg-black p-3 text-white flex items-center justify-between relative z-10">
                <h1 className="text-lg">RailBooking</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link to="/home" className="hover:text-gray-300">Home</Link></li>
                        <li>
                            <Link to="/" className="hover:text-gray-300">
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
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sd"
                style={{
                    backgroundImage: "url('https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp')"
                }}
            ></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-4 bg-black text-white shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="t mb-4">
                            <label htmlFor="username" className="block text-left text-white-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className=" mb-4">
                            <label htmlFor="password" className="block text-left text-white-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
