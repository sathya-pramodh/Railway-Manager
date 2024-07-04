import TitlePanel from "../components/TitlePanel";
import AboutBox from "../components/AboutBox";

const AboutUs: React.FC = () => {
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
                <div className="mt-40 p-4 mx-auto max-w-[calc(100%-4rem)] px-2">
                    <AboutBox />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
