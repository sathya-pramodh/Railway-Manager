import BookingBox from "../components/BookingBox";
import TitlePanel from "../components/TitlePanel";

const HomePage: React.FC = () => {
    return (
        <div className="relative h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sd"
                style={{
                    backgroundImage: "url('https://wallpaper.forfun.com/fetch/d9/d9acf7600af70619b5fe352bc175f404.jpeg')"
                }}
            ></div>
            <div className="relative z-10">
                <TitlePanel />
                <div className="mt-40 p-4 mx-auto max-w-[calc(100%-4rem)] px-2">  {/* Center box horizontally, limit width */}
                    <BookingBox text="Get The Best Railway Booking for A Best Prices" />
                </div>
            </div>
        </div>
    );
};


export default HomePage;
