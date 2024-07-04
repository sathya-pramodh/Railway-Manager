import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TitlePanel from '../components/TitlePanel';

interface Train {
    tid: number;
    source_sid: number;
    dest_sid: number;
    capacity: number;
    dtime: string; // Adjust according to your actual data structure
}

const SearchByTrainId: React.FC = () => {
    const location = useLocation();
    const { tid } = location.state || { tid: null };
    const [trains, setTrains] = useState<Train[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTrains = async () => {
            if (tid) {
                try {
                    const response = await axios.post('http://localhost:8080/api/searchByTrainId', { tid });
                    setTrains(response.data.trains);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
            }
        };

        fetchTrains();
    }, [tid]);

    if (loading) {
        return <p>Loading...</p>; // Add a loading indicator if needed
    }

    return (
        <>
            <div className="relative z-10">
                <TitlePanel title="Search Results" />
            </div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-4 bg-black text-white shadow-md rounded-lg text-center">
                    <h2 className="mt-4 text-lg">Search Results for Train ID: {tid}</h2>
                    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <table className="min-w-full bg-gray-800">
                            <thead>
                                <tr>
                                    <th className="py-2">Train ID</th>
                                    <th className="py-2">Source Station ID</th>
                                    <th className="py-2">Destination Station ID</th>
                                    <th className="py-2">Capacity</th>
                                    <th className="py-2">Departure Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trains.map((train, index) => (
                                    <tr key={index} className="bg-gray-700">
                                        <td className="py-2">{train.tid}</td>
                                        <td className="py-2">{train.source_sid}</td>
                                        <td className="py-2">{train.dest_sid}</td>
                                        <td className="py-2">{train.capacity}</td>
                                        <td className="py-2">{train.dtime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchByTrainId;
