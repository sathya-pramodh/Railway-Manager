import  { useEffect, useState } from 'react';
import axios from 'axios';

interface Train {
    tid: number;
    sourceSID: string;
    destSID: string;
    capacity: number;
    dtime: string;
}

interface SearchByTrainIdResponse {
    trains: Train[];
}

const SearchByTrainId = () => {
    const [trains, setTrains] = useState<Train[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<SearchByTrainIdResponse>('/api/searchByTrainId', { tid: 19 });
                setTrains(response.data.trains);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error appropriately
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
                {trains.length === 0 ? (
                    <p className="text-white">No trains found for the given ID.</p>
                ) : (
                    <ul className="divide-y divide-gray-700">
                        {trains.map((train) => (
                            <li key={train.tid} className="py-2">
                                <p className="text-white">
                                    Train ID: {train.tid}, Source: {train.sourceSID}, Destination: {train.destSID}
                                </p>
                                <p className="text-gray-400">Capacity: {train.capacity}, Departure Time: {train.dtime}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchByTrainId;
