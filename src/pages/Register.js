import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { api } from '../services/api';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const errorMessage = 'Passwords do not match.';
            setError(errorMessage);
            console.error(errorMessage);
            return;
        }

        try {
            const response = await api.post('/register', { username, password, displayName });
            setSuccess('Registration successful! You can now log in.');
            setError('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            console.log('Registration successful:', response.data);
        } catch (err) {
            const errorMessage = 'Registration failed. Username might already exist.';
            setError(errorMessage);
            setSuccess('');
            if (err.response && err.response.data && err.response.data.message) {
                console.error('Error details:', err.response.data.message);
            } else {
                console.error('Error details:', err.message);
            }
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <Heading as="h2" size="lg" textAlign="center" mb={4}>
                Register
            </Heading>
            <VStack as="form" onSubmit={handleSubmit} spacing={4} width="100%">
                {success && (
                    <Alert status="success">
                        <AlertIcon />
                        {success}
                    </Alert>
                )}
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </FormControl>
                <FormControl id="displayName" isRequired>
                    <FormLabel>Display Name</FormLabel>
                    <Input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your displayName"
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </FormControl>
                <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                    Register
                </Button>
            </VStack>
        </Box>
    );
}

export default Register; 