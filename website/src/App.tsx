import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/book" element={<BookingPage />} />
                <Route index path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
