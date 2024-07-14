import { useState } from 'react';
import { useLocation } from 'react-router';
import TitlePanel from '../components/TitlePanel';

interface Train {
    tid: number;
    sourceSid: number;
    destSid: number;
    capacity: number;
    dtime: string;
    price: number;  // Added price field
}

const SearchByTrainId = () => {
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
            const totalPrice = train.price * quantity;
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
                    backgroundImage: "url('https://wallpaper.forfun.com/fetch/d9/d9acf7600af70619b5fe352bc175f404.jpeg')"
                }}
            ></div>

            <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
                <div className="w-full max-w-3xl p-10 bg-black text-white shadow-md rounded-lg text-center">
                    <div className="mt-4 p-6 bg-gray-800 rounded-lg">
                        <h1 className="text-3xl font-bold mb-4">Search By Train</h1>
                        <table className="min-w-full mt-4 bg-gray-800">
                            <thead>
                                <tr>
                                    <th className="py-2">Select</th>
                                    <th className="py-2">Train ID</th>
                                    <th className="py-2">Source Station ID</th>
                                    <th className="py-2">Destination Station ID</th>
                                    <th className="py-2">Capacity</th>
                                    <th className="py-2">Departure Time</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trains.map((train: Train, index: number) => {
                                    const quantity = quantities[train.tid] || 1;
                                    const totalPrice = train.price * quantity;
                                    return (
                                        <tr key={index} className="bg-gray-700">
                                            <td className="py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTrain === train.tid}
                                                    onChange={() => handleCheckboxChange(train.tid)}
                                                />
                                            </td>
                                            <td className="py-2">{train.tid}</td>
                                            <td className="py-2">{train.sourceSid}</td>
                                            <td className="py-2">{train.destSid}</td>
                                            <td className="py-2">{train.capacity}</td>
                                            <td className="py-2">{train.dtime}</td>
                                            <td className="py-2">{totalPrice}</td>
                                            <td className="py-2">
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
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
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

export default SearchByTrainId;
