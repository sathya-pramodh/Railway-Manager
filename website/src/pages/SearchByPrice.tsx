import { useLocation } from "react-router";
import TitlePanel from "../components/TitlePanel";

interface Train {
    tid: number;
    sourceSID: string;
    destSID: string;
    capacity: number;
    dtime: string;
}

const SearchByTrainId = () => {
    const location = useLocation();
    const { trains } = location.state;
    return (
        <div className="container mx-auto mt-8">
            <div className="relative z-10">
                <TitlePanel />
            </div>
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
                {trains.length === 0 ? (
                    <p className="text-white">No trains found for the given ID.</p>
                ) : (
                    <ul className="divide-y divide-gray-700">
                        {trains.map((train: Train) => (
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
