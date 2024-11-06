import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import TaskDetail from './pages/TaskDetail';
import Navbar from './components/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Funciones de inicio y cierre de sesión
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    return (
        <Router>
            {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/calendarPage" /> : <Signin onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
                
                {isAuthenticated ? (
                    <>
                        <Route path="/calendarPage" element={<CalendarPage />} />
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/tasks/create" element={<TaskForm />} />
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </>
                ) : (
                    <Route path="*" element={<Signin onLogin={handleLogin} />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
