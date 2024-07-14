import axios from "axios";
import TitlePanel from "../components/TitlePanel";
import { useEffect, useState } from "react";

interface Booking {
    bid: number,
    uid: number,
    tid: number,
    sourceSid: number,
    destSid: number,
    price: number,
    btime: string,
}

const UserPage = () => {
    const [bookings, setBookings] = useState<null | Booking[]>(null);
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        axios.post('http://localhost:8080/api/getHistory', {
            uid: Number(uid)
        }).then((response) => {
            setBookings(response.data.bookings);
        });
    }, [])
    return <>
        <div
            className="absolute inset-0 bg-cover bg-center filter blur-sd"
            style={{
                backgroundImage: "url('https://wallpaper.forfun.com/fetch/d9/d9acf7600af70619b5fe352bc175f404.jpeg')"
            }}
        />
        <div className="relative z-10">
            <TitlePanel />
        </div>

        {bookings && <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
            <div className="w-full max-w-2xl p-8 bg-black text-white shadow-md rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-4">User Bookings</h1>
                <table className="min-w-full mt-4 bg-gray-800">
                    <thead>
                        <tr>
                            <th className="py-2">Booking ID</th>
                            <th className="py-2">Train ID</th>
                            <th className="py-2">User ID</th>
                            <th className="py-2">Booking Time</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Source Station ID</th>
                            <th className="py-2">Destination Station ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking: Booking, index: number) => (
                            <tr key={index} className="bg-gray-700">
                                <td className="py-2">{booking.bid}</td>
                                <td className="py-2">{booking.tid}</td>
                                <td className="py-2">{booking.uid}</td>
                                <td className="py-2">{booking.btime}</td>
                                <td className="py-2">{booking.price}</td>
                                <td className="py-2">{booking.sourceSid}</td>
                                <td className="py-2">{booking.destSid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>}
    </>
}

export default UserPage;
