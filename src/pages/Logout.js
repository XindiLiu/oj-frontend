import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Spinner, Text } from '@chakra-ui/react';

function Logout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate('/login');
        };
        performLogout();
    }, [logout, navigate]);

    return (
        <Box textAlign="center" mt={10}>
            <Spinner size="xl" />
            <Text mt={4}>Logging out...</Text>
        </Box>
    );
}

export default Logout;