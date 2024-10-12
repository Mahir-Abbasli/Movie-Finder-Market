import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    overview?: string;
}

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Product[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);


    const handleDeleteOrder = (id: number) => {
        const updatedOrders = orders.filter(order => order.id !== id);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handleCompleteOrder = (product: Product) => {
        setSnackbarMessage(`Your order for ${product.title} has been submitted!`);
        setOpenSnackbar(true);


        const updatedOrders = orders.filter(order => order.id !== product.id);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{
                        width: '100%',
                        backgroundColor: '#66bb6a', 
                        color: 'white', 
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length > 0 ? (
                    orders.map((product) => (
                        <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${product.poster_path}`}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
                                <p className="text-gray-600 mt-1">
                                    IMDb: <span className="font-bold">{product.vote_average ? product.vote_average.toFixed(1) : 'N/A'}</span>
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {product.overview && product.overview.length > 50
                                        ? `${product.overview.substring(0, 50)}...`
                                        : product.overview || 'No description'}
                                </p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Price: ${product.vote_average.toFixed(2)}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleCompleteOrder(product)} 
                                            className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition duration-200"
                                        >
                                            Complete Purchase
                                        </button>
                                        <button
                                            onClick={() => handleDeleteOrder(product.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No orders placed yet.</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
