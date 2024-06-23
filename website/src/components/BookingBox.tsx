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

export default BookingBox;
