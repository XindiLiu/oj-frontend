import React, { useState, useContext } from 'react';
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
    HStack,
} from '@chakra-ui/react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
    const { isLoggedIn, user, login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const location = useLocation();
    const navigate = useNavigate();

    const toggleLogin = () => {
        setMode('login');
        setError('');
    };

    const toggleRegister = () => {
        setMode('register');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (mode === 'login') {
            const result = await login(username, password);
            if (!result.success) {
                setError(result.message);
            } else {
                // Redirect to the previous page or home if no previous page
                const from = location.state?.from?.pathname || '/';
                navigate(from);
            }
        }
    };

    if (isLoggedIn) {
        return (
            <Box maxW="800px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <VStack spacing={4}>
                    <Heading as="h2" size="lg" textAlign="center" mb={4}>
                        You are already logged in as {user.username}!
                    </Heading>
                    <Button onClick={() => navigate(-1)} colorScheme="blue" mt={4}>
                        Go Back
                    </Button>
                </VStack>
            </Box>
        );
    }

    return (
        <Box maxW="400px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <VStack spacing={4}>
                <Heading as="h2" size="lg">
                    {mode === 'login' ? 'Login' : 'Register'}
                </Heading>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <HStack spacing={4}>
                    <Button onClick={toggleLogin} colorScheme={mode === 'login' ? 'teal' : 'gray'}>
                        Login
                    </Button>
                    <Button onClick={toggleRegister} colorScheme={mode === 'register' ? 'teal' : 'gray'}>
                        Register
                    </Button>
                </HStack>
                {mode === 'login' ? (
                    <VStack as="form" onSubmit={handleSubmit} spacing={4} width="100%">
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
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
                        <Button type="submit" colorScheme="blue" width="full">
                            Login
                        </Button>
                    </VStack>
                ) : (
                    <RegisterForm toggleMode={toggleRegister} />
                )}
            </VStack>
        </Box>
    );
}

function RegisterForm({ toggleMode }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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
            const response = await api.post('/register', { username, password, name });
            setSuccess('Registration successful! You can now log in.');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            // Optionally, switch to login mode
            // toggleMode();
        } catch (err) {
            setError('Registration failed. Username might already exist.');
            console.error('Registration error:', err);
        }
    };

    return (
        <VStack as="form" onSubmit={handleRegister} spacing={4} width="100%">
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
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
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
    );
}

export default Login;
