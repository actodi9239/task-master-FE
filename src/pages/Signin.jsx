import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link para navegación

function Signin({ onLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // Estado para manejar el error
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Limpiar el error al cambiar los campos
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://task-master-be-xzr5.onrender.com/api/users/signin', {
            email: formData.email,
            password: formData.password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                onLogin();
                navigate('/tasks');
            } else {
                console.error("Token is missing in the response");
            }
        })
        .catch(error => {
            console.error("There was an error logging in!", error);
            if (error.response && error.response.data) {
                // Mostrar el mensaje de error específico del servidor
                setError(error.response.data.message || 'Login failed! Please try again.');
            } else {
                setError('Login failed! Please try again.');
            }
        });
    };

    return (
        <div className="flex justify-center items-center bg-[#111518] min-h-screen text-white">
            <div className="w-full max-w-md bg-[#1a1e23] p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Task Master</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostrar mensaje de error */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-300">Don't have an account? <Link to="/signup" className="text-blue-500">Register here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
