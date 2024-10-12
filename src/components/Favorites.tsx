import React, { useState, useEffect } from 'react';
import favoriteIconRed from './../assets/111.png';

interface Product {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    overview?: string;
}

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const removeFavorite = (id: number) => {
        const updatedFavorites = favorites.filter(product => product.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="bg-gray-200 min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Favorites</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.length > 0 ? (
                    favorites.map((product) => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${product.poster_path}`}
                                alt={product.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                                    <img
                                        src={favoriteIconRed}
                                        alt="Favori"
                                        className="w-8 h-8 cursor-pointer"
                                        onClick={() => removeFavorite(product.id)} // Favorilerden silme işlemi
                                    />
                                </div>
                                <p className="text-lg text-gray-700">
                                    IMDb: {product.vote_average ? product.vote_average.toFixed(1) : 'N/A'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {product.overview && product.overview.length > 50
                                        ? `${product.overview.substring(0, 50)}...`
                                        : product.overview || 'Açıklama yok'}
                                </p>
                                {/* Fiyat ve Buy Now butonu ekledik */}
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Price: ${product.vote_average.toFixed(2)}</span>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Favori ürün yok.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
