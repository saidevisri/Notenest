// frontend/src/components/Navbar.js
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    NoteNest
                </Link>
                <div>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="text-white hover:bg-blue-700 px-3 py-2 rounded"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:bg-blue-700 px-3 py-2 rounded mr-2"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-white hover:bg-blue-700 px-3 py-2 rounded"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;