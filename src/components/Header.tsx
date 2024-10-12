import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../App.css';
import ProfileIcon from './../assets/user.png';

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkLoginStatus = () => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
    };

    useEffect(() => {
        checkLoginStatus();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'isLoggedIn') {
                checkLoginStatus();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!searchTerm.trim()) {
            setError("Please enter a valid search term.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=18a1107e672a491420eed0deb0d5163e&query=${encodeURIComponent(searchTerm)}&language=en-US&page=1`
            );

            if (!response.ok) {
                throw new Error('Something went wrong with the search.');
            }

            const data = await response.json();
            navigate('/search-results', { state: { results: data.results } });
        } catch (err) {
            setError('An error occurred while fetching data.');
            console.error('API error:', err);
        }
    };

    const handleSignOut = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        setDropdownVisible(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                <div className="text-2xl font-bold cursor-pointer mx-4" onClick={() => navigate('/')}>
                    Movie Market
                </div>
                <form onSubmit={handleSearch} className="flex flex-grow relative w-full md:w-auto mx-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="border p-2 rounded-l-md flex-grow focus:outline-none text-black"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">Search</button>
                </form>
                <nav className="flex flex-col md:flex-row items-center mx-4">
                    <div className="flex justify-center md:justify-end space-x-6"> {/* Increased spacing between links */}
                        <Link to="/favorites" className="hover:text-gray-300">Favorites</Link>
                        <Link to="/orders" className="hover:text-gray-300">Orders</Link>
                        <Link to="/register" className="hover:text-gray-300">Register</Link>
                        {isLoggedIn ? (
                            <div className="relative">
                                <img
                                    src={ProfileIcon}
                                    alt="Profile"
                                    className="w-8 h-8 cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {dropdownVisible && (
                                    <div className="absolute right-0 mt-2 bg-red-500 text-white rounded shadow-lg z-10">
                                        <p
                                            onClick={handleSignOut}
                                            className="p-2 w-24 text-center cursor-pointer hover:bg-red-600"
                                        >
                                            Sign Out
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
                        )}
                    </div>
                </nav>
            </div>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </header>
    );
};

export default Header;
