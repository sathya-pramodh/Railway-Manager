import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TitlePanel from "../components/TitlePanel";

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
                localStorage.setItem('uid', response.data.user.uid);
                navigate('/home');
            } else {
                alert('Invalid credentials');
                navigate('/');
            }
        } catch (error) {
            alert('Invalid credentials');
            navigate('/');
        }
    };

    return (
        <>
            <div className="relative z-10">
                <TitlePanel />
            </div>
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sd"
                style={{
                    backgroundImage: "url('https://wallpaper.forfun.com/fetch/d9/d9acf7600af70619b5fe352bc175f404.jpeg')"
                }}
            ></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-4 bg-black text-white shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="t mb-4">
                            <label htmlFor="username" className="block text-left text-white-700">Email</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
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
                                className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
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
