import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password: string) => {
        const hasMinimumLength = password.length >= 6;
        const hasTwoDigits = (password.match(/\d/g) || []).length >= 2;
        const hasUppercaseLetter = /[A-Z]/.test(password);
        return hasMinimumLength && hasTwoDigits && hasUppercaseLetter;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        
        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }


        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }


        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long, contain at least 2 digits and 1 uppercase letter');
            return;
        }

        localStorage.setItem('user', JSON.stringify({ username, email, password }));
        localStorage.setItem('isLoggedIn', 'true');

        navigate('/signin');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all duration-300 ease-in-out"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/signin" className="text-blue-500 hover:text-blue-600 font-semibold">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
