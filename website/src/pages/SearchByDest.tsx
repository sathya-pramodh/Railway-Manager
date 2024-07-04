import { useLocation } from "react-router";
import TitlePanel from "../components/TitlePanel";

interface Route {
    tid: number;
    sourceSid: number;
    destSid: number;
    price: number;
}

const SearchByDest = () => {
    const location = useLocation();
    const { routes } = location.state;

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
                    <h1 className="text-3xl font-bold mb-4">Search Routes</h1>
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
                            {routes.map((route: Route, index: number) => (
                                <tr key={index} className="bg-gray-700">
                                    <td className="py-2">{route.tid}</td>
                                    <td className="py-2">{route.sourceSid}</td>
                                    <td className="py-2">{route.destSid}</td>
                                    <td className="py-2">{route.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SearchByDest;
