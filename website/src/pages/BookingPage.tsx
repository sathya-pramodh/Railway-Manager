import { useState } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { useNavigate } from 'react-router-dom';
import TitlePanel from "../components/TitlePanel";
import axios from 'axios';

interface OptionType {
    value: string;
    label: string;
    description: string;
}

const options: OptionType[] = [
    { value: 'Destination', label: 'Destination', description: "Destination" },
    { value: 'Price', label: 'Price', description: 'Price' },
    { value: 'Train', label: 'Train', description: 'Train' },
];

const customStyles: StylesConfig<OptionType, false> = {
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
        backgroundColor: 'black',
        color: 'white'
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid white'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'grey' : 'black',
        color: 'white'
    })
};

const BookingPage = () => {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [sourceDestination, setSourceDestination] = useState('');
    const [finalDestination, setFinalDestination] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [train, setTrain] = useState('');

    const navigate = useNavigate();

    const handleSelectChange = (option: SingleValue<OptionType>) => {
        setSelectedOption(option);
        setSourceDestination('');
        setFinalDestination('');
        setPriceRange('');
        setTrain('');
    };

    const handleSubmit = async () => {
        if (selectedOption?.value === 'Price') {
            let lowerBound = 0;
            let upperBound = 1000;

            switch (priceRange) {
                case '<1000':
                    lowerBound = 0;
                    upperBound = 1000;
                    break;
                case '1000-2500':
                    lowerBound = 1000;
                    upperBound = 2500;
                    break;
                case '2500-5000':
                    lowerBound = 2500;
                    upperBound = 5000;
                    break;
                case '>5000':
                    lowerBound = 5000;
                    upperBound = Infinity;
                    break;
            }

            try {
                const response = await axios.post('http://localhost:8080/api/searchByPrice', {
                    priceLowerBound: lowerBound,
                    priceUpperBound: upperBound,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate('/search-by-price', {
                    state: {
                        trains: response.data.trains
                    }
                });
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        } else if (selectedOption?.value === 'Destination') {
            try {
                const response = await axios.post('http://localhost:8080/api/searchByDest', {
                    sourceStation: sourceDestination,
                    destinationStation: finalDestination,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate('/search-by-dest', {
                    state: {
                        routes: response.data.routes
                    }
                });
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        } else if (selectedOption?.value === 'Train') {
            try {
                const response = await axios.post('http://localhost:8080/api/searchByTrainId', {
                    tid: Number(train)
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate('/search-by-trainid', {
                    state: {
                        trains: response.data.trains,
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <div className="relative h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sd"
                style={{
                    backgroundImage: "url('https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp')"
                }}
            ></div>
            <div className="relative z-10">
                <TitlePanel />
            </div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-4 bg-black text-white shadow-md rounded-lg text-center">
                    <h2 className="mt-4 text-lg">Select your Facility</h2>
                    <Select
                        options={options}
                        onChange={handleSelectChange}
                        placeholder="Select an option"
                        styles={customStyles}
                        className="react-select mt-4"
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
                                    value={train}
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
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
