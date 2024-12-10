// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const fetchCurrentUser = async () => {
        try {
            const response = await api.get('/currentUser');
            if (!response.data.success) {
                throw new Error('Bad credentials');
            }
            setUser(response.data.data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Bad credentials:', error);
            Cookies.remove('token', { path: '/' });
            toast({
                title: 'Invalid credentials',
                description: 'Please login again',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        try {
            // const token = Cookies.get('token');
            // if (token) {
            //     fetchCurrentUser();
            //     if (isLoggedIn) {
            //         return { success: false, message: 'Already logged in' };
            //     }
            // }
            const response = await api.post('/login', { username, password });
            if (response.data.success) {
                const token = response.data.data;
                Cookies.set('token', token, { expires: 7, path: '/' });
                await fetchCurrentUser();
                toast({
                    title: 'Login Successful',
                    description: 'You have successfully logged in.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                return { success: true };
            } else {
                setIsLoggedIn(false);
                setUser(null);
                return { success: false, message: response.data.msg };
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast({
                title: 'Login Failed',
                description: 'Invalid username or password.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setIsLoggedIn(false);
            setUser(null);
            return { success: false, message: 'Invalid username or password' };
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
            toast({
                title: 'Logged Out',
                description: 'You have been successfully logged out.',
                status: 'info',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error during logout:', error);
            toast({
                title: 'Logout Error',
                description: 'There was an error logging you out.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            Cookies.remove('token', { path: '/' });
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};