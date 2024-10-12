// Search.tsx
import React, { useState } from 'react';

interface Product {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    overview?: string;
}

interface SearchProps {
    onSearchResults: (results: Product[]) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query) return;

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=18a1107e672a491420eed0deb0d5163e&language=en-US&query=${query}`);
            const data = await response.json();
            onSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
                className="border border-gray-300 p-2 rounded-md"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                Search
            </button>
        </div>
    );
};

export default Search;
