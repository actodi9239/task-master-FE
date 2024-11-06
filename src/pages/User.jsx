import React, { useEffect, useState } from 'react';
import axios from 'axios';

function User() {
    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        motherLastName: '',
        phone: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:4000/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching user data:', error);
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.put('http://localhost:4000/api/users/me', userData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            alert('Profile updated successfully!');
        })
        .catch(error => {
            console.error('There was an error updating the profile:', error);
        });
    };

    return (
        <div className="flex justify-center items-center bg-[#111518] min-h-screen text-white">
            <div className="w-full max-w-md bg-[#1a1e23] p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            readOnly
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Paternal Surname</label>
                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Maternal Surname</label>
                        <input
                            type="text"
                            name="motherLastName"
                            value={userData.motherLastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Cell Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={userData.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-[#2a2f36] border border-[#3a3f45] rounded-lg text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default User;
