// frontend/src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            setToken(res.data.token);
            setUser({ id: res.data.token }); // You can decode the token to get user ID if needed
        } catch (err) {
            console.error(err.response.data);
            throw err;
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });
            setToken(res.data.token);
            setUser({ id: res.data.token });
        } catch (err) {
            console.error(err.response.data);
            throw err;
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };