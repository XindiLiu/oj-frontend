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
    Text,
} from '@chakra-ui/react';
import { api } from '../services/api';
import Field from '@/components/ui/field';

function RegisterForm({ toggleMode }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await api.post('/register', { username, password, displayName });
            setSuccess('Registration successful! You can now log in.');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setDisplayName('');
            // Optionally, switch to login mode
            // toggleMode();
        } catch (err) {
            setError('Registration failed. Username might already exist.');
            console.error('Registration error:', err);
        }
    };

    return (
        <VStack as="form" onSubmit={handleRegister} spacing={4} w="100%" maxW="400px" mx="auto">
            <Heading size="lg">Register</Heading>
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
            <Button type="submit" colorScheme="green" width="full">
                Register
            </Button>
        </VStack>
    );
}

export default RegisterForm;