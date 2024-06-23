import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import TitlePanel from "../components/TitlePanel";

interface OptionType {
    value: string;
    label: string;
    description: string;
}

const options: OptionType[] = [
    { value: 'Destination', label: 'Destination', description: "Destination" },
    { value: 'Date/Time', label: 'Date/Time', description: 'Date/Time' },
    { value: 'Price', label: 'Price', description: 'Price' },
    { value: 'Train', label: 'Train', description: 'Train' },
    { value: 'History of Booking', label: 'History of Booking', description: "History of Booking" },
    { value: 'Status of The Train', label: 'Status of The Train', description: "Status of The Train" }
];

const customStyles = {
    menu: (provided: any) => ({
        ...provided,
        zIndex: 9999,
        backgroundColor: 'black',
        color: 'white'
    }),
    control: (provided: any) => ({
        ...provided,
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid white'
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'white'
    }),
    option: (provided: any, state: { isFocused: any; }) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'grey' : 'black',
        color: 'white'
    })
};

const BookingPage = () => {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [sourceDestination, setSourceDestination] = useState('');
    const [finalDestination, setFinalDestination] = useState('');
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [Train, setTrain] = useState('');
    const [AccountID, setAccountID] = useState('');
    const [STrainID, setSTrainID] = useState('');


    const handleSelectChange = (option: SingleValue<OptionType>) => {
        setSelectedOption(option);

        // Reset input fields when a new option is selected
        setSourceDestination('');
        setFinalDestination('');
        setDate('');
        setTime('');
        setPriceRange('');
        setTrain('');
        setAccountID('');
        setSTrainID('');
    };

    const handleSubmit = () => {
        // Implement your logic to handle submission of sourceDestination and finalDestination
        // This function can be expanded based on your application's requirements
        console.log('Source Destination:', sourceDestination);
        console.log('Final Destination:', finalDestination);
        console.log('Date:', Date);
        console.log('Time:', Time);
        console.log('PriceRange:', priceRange);
        console.log('Account Id:', AccountID);
        console.log('Train Name or Id:', Train);
        console.log('Status  TrainId:', STrainID);
        
    };
    

    return (
        <>
            <div className="relative z-10">
                <TitlePanel title="RailBooking" />
            </div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-4 bg-black text-white shadow-md rounded-lg text-center">
                    <h2 className="mt-4 text-lg">Select your Facility</h2>
                    <Select 
                        options={options}
                        onChange={handleSelectChange}
                        placeholder="Select an option"
                        styles={customStyles} // Apply custom styles
                        className="mt-4"
                        classNamePrefix="react-select"
                    />
                    {selectedOption && selectedOption.value === 'Destination' && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-xl font-semibold">{selectedOption.label}</h3>
                            <div className="mt-2">
                                <label className="block text-white">Source Destination:</label>
                                <input
                                    type="text"
                                    value={sourceDestination}
                                    onChange={(e) => setSourceDestination(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block text-white">Final Destination:</label>
                                <input
                                    type="text"
                                    value={finalDestination}
                                    onChange={(e) => setFinalDestination(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                    {selectedOption && selectedOption.value === 'Date/Time' && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-xl font-semibold">{selectedOption.label}</h3>
                            <div className="mt-2">
                                <label className="block text-white">Date:</label>
                                <input
                                    type="date"
                                    value={Date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block text-white">Time in 24hrs format:</label>
                                <input
                                    type="time"
                                    value={Time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                    {selectedOption && selectedOption.value === 'Price' && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        
                            <div className="mt-2">
                            <label className="block text-white">Price Range:</label>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                            >
                                <option value="<1000">Less than Rs1000</option>
                                <option value="1000-2500">Rs1000 - Rs2500</option>
                                <option value="2500-5000">Rs2500 - Rs5000</option>
                                <option value=">5000">Beyond Rs5000</option>
                            </select>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                            >
                                 Submit
                                </button>
                        </div>
                    )}
                    {selectedOption && selectedOption.value === 'Train' && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-xl font-semibold">{selectedOption.label}</h3>
                            <div className="mt-2">
                                <label className="block text-white">Train Name or Id:</label>
                                <input
                                    type="text"
                                    value={Train}
                                    onChange={(e) => setTrain(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                    {selectedOption && selectedOption.value === 'History of Booking' && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-xl font-semibold">{selectedOption.label}</h3>
                            <div className="mt-2">
                                <label className="block text-white">Enter the AccountID:</label>
                                <input
                                    type="text"
                                    value={AccountID}
                                    onChange={(e) => setAccountID(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                    {selectedOption && selectedOption.value === 'Status of The Train' && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-xl font-semibold">{selectedOption.label}</h3>
                            <div className="mt-2">
                                <label className="block text-white">Enter the TrainId:</label>
                                <input
                                    type="number"
                                    value={STrainID}
                                    onChange={(e) => setSTrainID(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-md focus:outline-none focus:ring"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    )}

                </div>
            </div>
            <div className="absolute inset-0 bg-cover bg-center filter blur-sd" style={{
                backgroundImage: "url('https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp')"
            }}>
            </div>
        </>
    );
};

export default BookingPage;
