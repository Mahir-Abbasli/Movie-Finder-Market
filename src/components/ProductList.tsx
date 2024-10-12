import React, { useEffect, useState } from 'react';
import favoriteIcon from './../assets/000.png';
import favoriteIconRed from './../assets/111.png';
import { Snackbar, Alert } from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

interface Product {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    overview?: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Product[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'warning'>('success');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=18a1107e672a491420eed0deb0d5163e&language=en-US&page=1');
                const data = await response.json();
                setProducts(data.results);
            } catch (error) {
                console.error('Ürünler alınamadı:', error);
            }
        };

        fetchProducts();

        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }

        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    const toggleFavorite = (product: Product) => {
        const existingFavorite = favorites.find(fav => fav.id === product.id);
        if (existingFavorite) {

            const updatedFavorites = favorites.filter(fav => fav.id !== product.id);
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {

            const updatedFavorites = [...favorites, product];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };


    const addToOrders = (product: Product) => {
        const existingOrder = orders.find(order => order.id === product.id);
        if (existingOrder) {
            setSnackbarMessage(`${product.title} is already in the orders.`);
            setSnackbarSeverity('warning'); 
            setOpenSnackbar(true);
        } else {
            const updatedOrders = [...orders, product];
            setOrders(updatedOrders);
            localStorage.setItem('orders', JSON.stringify(updatedOrders)); 
            setSnackbarMessage(`${product.title} has been added to orders.`);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        }
    };


    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="bg-gray-200 min-h-screen p-4">
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{
                        width: '100%',
                        backgroundColor: snackbarSeverity === 'success' ? '#66bb6a' : '#ffeb3b',
                        color: 'black', 
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative h-100">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${product.poster_path}`}
                            alt={product.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                                <div
                                    className={`cursor-pointer`}
                                    onClick={() => toggleFavorite(product)}
                                >
                                    <img
                                        src={favorites.some(fav => fav.id === product.id) ? favoriteIconRed : favoriteIcon}
                                        alt="Favori"
                                        className="w-8 h-8 ml-2"
                                    />
                                </div>
                            </div>
                            <p className="text-lg text-gray-700">IMDb: {product.vote_average.toFixed(1)}</p>
                            <p className="text-sm text-gray-600">
                                {product.overview && product.overview.length > 50
                                    ? `${product.overview.substring(0, 50)}...`
                                    : product.overview || 'Açıklama yok'}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-800">Price: ${product.vote_average.toFixed(2)}</span>
                                <button
                                    onClick={() => addToOrders(product)}  
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
