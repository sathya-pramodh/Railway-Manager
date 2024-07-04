import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import SearchByDest from './pages/SearchByDest';
import SearchByPrice from './pages/SearchByPrice';
import SearchByTrainId from './pages/SearchByTrainId';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/book" element={<ProtectedRoute element={<BookingPage />} />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/search-by-dest" element={<ProtectedRoute element={<SearchByDest />} />} />
                <Route path="/search-by-price" element={<ProtectedRoute element={<SearchByPrice />} />} />
                <Route path="/search-by-trainid" element={<ProtectedRoute element={<SearchByTrainId />} />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
