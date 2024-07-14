import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import TitlePanel from "../components/TitlePanel";
import axios from 'axios';

interface Route {
    tid: number;
    sourceSid: number;
    destSid: number;
    price: number;
}

const SearchByDest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { routes } = location.state;

    const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleCheckboxChange = (tid: number) => {
        setSelectedRoute(tid);
    };

    const handleDropdownChange = (tid: number, value: number) => {
        setQuantities((prev) => ({ ...prev, [tid]: value }));
    };

    const handleSubmit = async () => {
        if (selectedRoute !== null) {
            const route = routes.find((r: Route) => r.tid === selectedRoute);
            const quantity = quantities[selectedRoute] || 1;
            const totalPrice = route.price * quantity;

            const bookingData = {
                uid: 1, // Replace with actual user ID
                tid: route.tid,
                sourceSid: route.sourceSid,
                destSid: route.destSid,
                price: totalPrice,
            };

            console.log("Booking Data:", bookingData); // Debugging log

            try {
                const response = await axios.post("/api/addBooking", { booking: bookingData });

                console.log("Response Data:", response.data); // Debugging log

                if (response.status === 200) {
                    alert(`Route ID: ${selectedRoute}, Quantity: ${quantity}, Total Price: ${totalPrice}`);
                    navigate("/user"); // Redirect to UserPage to see updated bookings
                } else {
                    alert(`Failed to book the route. Please try again. Server response: ${response.data}`);
                    window.location.reload();
                }
            } catch (error) {
                console.error("Error:", error); // Debugging log
                alert("An error occurred. Please try again.");
                window.location.reload();
            }
        } else {
            alert("Please select a route.");
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
                <div className="w-full max-w-2xl p-8 bg-black text-white shadow-md rounded-lg text-center">
                    <h1 className="text-3xl font-bold mb-4">Search Routes</h1>
                    <table className="min-w-full mt-4 bg-gray-800">
                        <thead>
                            <tr>
                                <th className="py-2">Select</th>
                                <th className="py-2">Train ID</th>
                                <th className="py-2">Source Station ID</th>
                                <th className="py-2">Destination Station ID</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routes.map((route: Route, index: number) => {
                                const quantity = quantities[route.tid] || 1;
                                const totalPrice = route.price * quantity;
                                return (
                                    <tr key={index} className="bg-gray-700">
                                        <td className="py-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedRoute === route.tid}
                                                onChange={() => handleCheckboxChange(route.tid)}
                                            />
                                        </td>
                                        <td className="py-2">{route.tid}</td>
                                        <td className="py-2">{route.sourceSid}</td>
                                        <td className="py-2">{route.destSid}</td>
                                        <td className="py-2">{totalPrice}</td>
                                        <td className="py-2">
                                            <select
                                                className="bg-gray-800 text-white"
                                                value={quantity}
                                                onChange={(e) => handleDropdownChange(route.tid, parseInt(e.target.value))}
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
        </>
    );
};

export default SearchByDest;
