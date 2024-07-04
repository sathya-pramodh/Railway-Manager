import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import SearchByDest from './pages/SearchByDest';
import SearchByPrice from './pages/SearchByPrice';
import SearchByTrainId from './pages/SerachByTrainId';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/book" element={<BookingPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/search-by-dest" element={<SearchByDest />} />
                <Route path="/search-by-price" element={<SearchByPrice />} />
                <Route path="/search-by-trainid" element={<SearchByTrainId />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
