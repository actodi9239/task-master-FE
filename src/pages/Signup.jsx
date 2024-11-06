import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link para la navegación

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password1: '',
        password2: '',
        firstName: '',
        lastName: '',
        motherLastName: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password1 !== formData.password2) {
            alert("Passwords do not match!");
            return;
        }

        axios.post('http://localhost:4000/api/users/signup', {
            email: formData.username,
            password: formData.password1,
            firstName: formData.firstName,
            lastName: formData.lastName,
            motherLastName: formData.motherLastName,
            phone: formData.phone
        })
        .then(response => {
            alert("User registered successfully!");
            navigate('/signin');
        })
        .catch(error => {
            console.error("There was an error registering the user!", error);
        });
    };

    return (
        <div className="flex justify-center items-center bg-[#111518] min-h-screen text-white">
            <div className="w-full max-w-md bg-[#1a1e23] p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Username (Email)</label>
                        <input 
                            type="text" 
                            name="username" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">First Name</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Last Name</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Mother's Last Name</label>
                        <input 
                            type="text" 
                            name="motherLastName" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Phone</label>
                        <input 
                            type="text" 
                            name="phone" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Password</label>
                        <input 
                            type="password" 
                            name="password1" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Confirm Password</label>
                        <input 
                            type="password" 
                            name="password2" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-300">Already have an account? <Link to="/signin" className="text-blue-500">Login here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
