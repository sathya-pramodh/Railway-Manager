import React, { useState } from 'react';
import axios from 'axios';
import TitlePanel from "../components/TitlePanel";

interface Route {
    tid: number;
    source_sid: number;
    dest_sid: number;
    price: number;
}

const SearchByDest: React.FC = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [sourceStation, setSourceStation] = useState('');
    const [destinationStation, setDestinationStation] = useState('');

    const fetchRoutes = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/searchByDest', {
                sourceStation: sourceStation,
                destinationStation: destinationStation,
            }, {
                headers : {
                'Content-Type': 'application/json',
            }
            });
            console.log(response);
            setRoutes(response.data.routes);
        } catch (error) {
            console.error('Error fetching routes:', error);
            // Handle error state or display error message
        }
    };

    return (
        <>
            <div className="relative z-10">
                <TitlePanel title="RailBooking" />
            </div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-4 bg-black text-white shadow-md rounded-lg text-center">
                    <div className="min-h-screen bg-black text-white">
                        <div className="p-4">
                            <h1 className="text-3xl font-bold">Search Routes</h1>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Source Station"
                                    value={sourceStation}
                                    onChange={(e) => setSourceStation(e.target.value)}
                                    className="p-2 m-2 bg-gray-800 text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Destination Station"
                                    value={destinationStation}
                                    onChange={(e) => setDestinationStation(e.target.value)}
                                    className="p-2 m-2 bg-gray-800 text-white"
                                />
                                <button
                                    onClick={fetchRoutes}
                                    className="p-2 m-2 bg-blue-600 text-white"
                                >
                                    Search
                                </button>
                            </div>
                            <table className="min-w-full mt-4 bg-gray-800">
                                <thead>
                                    <tr>
                                        <th className="py-2">Train ID</th>
                                        <th className="py-2">Source Station ID</th>
                                        <th className="py-2">Destination Station ID</th>
                                        <th className="py-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routes.map((route, index) => (
                                        <tr key={index} className="bg-gray-700">
                                            <td className="py-2">{route.tid}</td>
                                            <td className="py-2">{route.source_sid}</td>
                                            <td className="py-2">{route.dest_sid}</td>
                                            <td className="py-2">{route.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchByDest;
