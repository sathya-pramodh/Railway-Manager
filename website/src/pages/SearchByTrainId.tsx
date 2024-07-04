import { useLocation } from 'react-router';
import TitlePanel from '../components/TitlePanel';

interface Train {
    tid: number;
    sourceSid: number;
    destSid: number;
    capacity: number;
    dtime: string; 
}

const SearchByTrainId = () => {
    const location = useLocation();
    const { trains } = location.state;

    return (
        <>
            <div className="relative z-10">
                <TitlePanel />
            </div>
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sd"
                style={{
                    backgroundImage: "url('https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp')"
                }}
            ></div>

            <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
                <div className="w-full max-w-3xl p-10 bg-black text-white shadow-md rounded-lg text-center">
                    <div className="mt-4 p-6 bg-gray-800 rounded-lg">
                        <h1 className="text-3xl font-bold mb-4">Search By Train</h1>
                        <table className="min-w-full mt-4 bg-gray-800">
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
                                {trains.map((train: Train, index: number) => (
                                    <tr key={index} className="bg-gray-700">
                                        <td className="py-2">{train.tid}</td>
                                        <td className="py-2">{train.sourceSid}</td>
                                        <td className="py-2">{train.destSid}</td>
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
