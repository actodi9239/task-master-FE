import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="text-white text-xl font-bold hover:underline">
                        Task Master
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    {/* Mostrar "Home" solo si está autenticado */}
                    {isAuthenticated && (
                        <li><Link to="/calendarPage" className="text-white hover:underline">Calendar</Link></li>
                    )}
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/tasks" className="text-white hover:underline">Tasks</Link></li>
                            <li>
                                <button onClick={handleLogout} className="text-white hover:underline">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/signin" className="text-white hover:underline">Signin</Link></li>
                            <li><Link to="/signup" className="text-white hover:underline">Register</Link></li> {/* Cambiado a Register */}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
