import axios from 'axios';

const API_KEY = '18a1107e672a491420eed0deb0d5163e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};
