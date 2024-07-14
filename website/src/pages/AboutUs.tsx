import TitlePanel from "../components/TitlePanel";
import AboutBox from "../components/AboutBox";

const AboutUs: React.FC = () => {
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
                <div className="mt-40 p-4 mx-auto max-w-[calc(100%-4rem)] px-2">
                    <AboutBox />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
