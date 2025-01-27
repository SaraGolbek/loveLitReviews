import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Book from './pages/Book';
import LogInPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import './styles/app.scss'


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/books/:id" element={<Book />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/profile/:username" element={<ProfilePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
