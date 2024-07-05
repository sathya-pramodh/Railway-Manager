import  { useState } from 'react';
import { useLocation } from "react-router";
import TitlePanel from "../components/TitlePanel";

interface Train {
    tid: number;
    sourceSID: string;
    destSID: string;
    capacity: number;
    dtime: string;
    totalPrice: number; // Use totalPrice if this is the field from the API
}

const SearchByPrice = () => {
    const location = useLocation();
    const { trains } = location.state;

    const [selectedTrain, setSelectedTrain] = useState<number | null>(null);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleCheckboxChange = (tid: number) => {
        setSelectedTrain(tid);
    };

    const handleDropdownChange = (tid: number, value: number) => {
        setQuantities((prev) => ({ ...prev, [tid]: value }));
    };

    const handleSubmit = () => {
        if (selectedTrain !== null) {
            const train = trains.find((t: Train) => t.tid === selectedTrain);
            const quantity = quantities[selectedTrain] || 1;
            const totalPrice = train.totalPrice * quantity;
            alert(`Train ID: ${selectedTrain}, Quantity: ${quantity}, Total Price: ${totalPrice}`);
        } else {
            alert("Please select a train.");
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
                    backgroundImage: "url('https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp')"
                }}
            ></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
                <div className="w-full max-w-2xl p-8 bg-black text-white shadow-md rounded-lg text-center">
                    <h1 className="text-3xl font-bold mb-4">Search Results</h1>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        {trains.length === 0 ? (
                            <p className="text-white">No trains found for the given price range.</p>
                        ) : (
                            <ul className="divide-y divide-gray-700">
                                {trains.map((train: Train) => {
                                    const quantity = quantities[train.tid] || 1;
                                    const totalPrice = train.totalPrice * quantity;
                                    return (
                                        <li key={train.tid} className="py-2 flex justify-between items-center">
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTrain === train.tid}
                                                    onChange={() => handleCheckboxChange(train.tid)}
                                                    className="mr-2"
                                                />
                                                <span className="text-white">Train ID: {train.tid}, Source: {train.sourceSID}, Destination: {train.destSID}</span>
                                                <p className="text-gray-400">Capacity: {train.capacity}, Departure Time: {train.dtime}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-white mr-2">${totalPrice}</span>
                                                <select
                                                    className="bg-gray-800 text-white"
                                                    value={quantity}
                                                    onChange={(e) => handleDropdownChange(train.tid, parseInt(e.target.value))}
                                                >
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <option key={num} value={num}>
                                                            {num}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchByPrice;
