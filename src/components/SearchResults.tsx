import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

interface Product {
    id: number;
    title: string;
    poster_path?: string;
    vote_average?: number; 
    overview: string; 
}

const SearchResults: React.FC = () => {
    const location = useLocation();
    const results: Product[] = location.state?.results || [];
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div className="bg-gray-200 min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Arama Sonuçları</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.length > 0 ? (
                    results.map((product: Product) => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative h-100">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${product.poster_path}`}
                                alt={product.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                                <p className="text-lg text-gray-700">
                                    IMDb: {product.vote_average !== undefined ? product.vote_average : 'N/A'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {product.overview && product.overview.length > 50
                                        ? `${product.overview.substring(0, 50)}...`
                                        : product.overview || 'Açıklama yok'}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Hiç sonuç bulunamadı.</p>
                )}
            </div>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SearchResults;
