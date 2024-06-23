import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing a user icon from react-icons


interface TitlePanelProps {
  title: string;
}


const TitlePanel: React.FC<TitlePanelProps> = ({ title }) => {
  return (
    <div className="bg-black p-3 text-white flex items-center justify-between">
      <h1 className="text-lg">{title}</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="hover:text-gray-300 flex items-center">
            <FaUserCircle className="mr-1" /> Account
          </a></li>
        </ul>
      </nav>
    </div>
  );
};


interface BookingBoxProps {
  text: string;
}


const BookingBox: React.FC<BookingBoxProps> = ({ text }) => {
  return (
    <div className="bg-black w-1/2 mx-auto mt-24 p-6 text-white text-center">
     
      <p className="text-lg">{text}</p>
      <button className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">  <a href='/book'>
        Book Now
        </a>
      </button>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sd"
        style={{
          backgroundImage: "url('https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp')"
        }}
      ></div>
      <div className="relative z-10">
        <TitlePanel title="RailBooking" />
        <div className="mt-40 p-4 mx-auto max-w-[calc(100%-4rem)] px-2">  {/* Center box horizontally, limit width */}
          <BookingBox text="Get The Best Railway Booking for A Best Prices" />
        </div>
        {/* Other components and content */}
      </div>
    </div>
  );
};


export default App;





