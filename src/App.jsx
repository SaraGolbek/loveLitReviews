import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Book from './pages/Book';
import LogInPage from './pages/LoginPage';
import './styles/app.scss'


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Routes that use the Layout */}
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/books/:id" element={<Book />} />
                </Route>

                {/* Routes that do not use the Layout */}
                <Route path="/login" element={<LogInPage />} />
            </Routes>
        </Router>
    );
};

export default App;
