// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useToast } from '@chakra-ui/react';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    const toast = useToast();

    if (!token) {
        toast({
            title: 'Access Denied',
            description: 'You must be logged in to access this page.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        // Optionally, check token expiration
        return children;
    } catch (e) {
        toast({
            title: 'Invalid Token',
            description: 'Your session has expired. Please log in again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;